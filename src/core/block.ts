import {v4 as makeUUID} from 'uuid';
import EventBus from './event-bus';
import Handlebars from 'handlebars';

type TBlockProps = {
  [key: string]: any;
}

type IMeta = {
	tagName: string;
	props: TBlockProps
}

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  protected  _element: HTMLElement | null = null;
  protected  _meta: IMeta;
  protected  _id: string = makeUUID();
  protected  props: TBlockProps;
  protected eventBus: () => EventBus<string>;
  protected children: Record<string, Block> | Record<string, Block[]>;

  constructor(tagName = "div", propsWithChildren = {}) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.children = children;

    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy({ ...props, __id: this._id });

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus<string>) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, props  } = this._meta;
    this._element = this._createDocumentElement(tagName);

    if (typeof props.className === "string" && this._element) {
      const classes = props.className.split(" ");
      this._element.classList.add(...classes);
    }

    if (typeof props.attrs === "object") {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        if(this._element) {
          this._element.setAttribute(attrName, String(attrValue));
        }
      });
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _getChildrenAndProps(propsAndChildren: TBlockProps) {
    const children: Record<string, Block[]> | Record<string, Block> = {};
    const props: TBlockProps = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((obj) => {
          if (obj instanceof Block) {
            children[key] = value;
          } else {
            props[key] = value;
          }
        });
        return;
      }

      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps?: TBlockProps, newProps?: TBlockProps): boolean {
    return oldProps !== newProps;
}

  setProps = (nextProps: TBlockProps) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  setPropsForChildren(children: Block | Block[], newProps: any) {
    if (Array.isArray(children)) {
        children.forEach(child => {
            if (child instanceof Block) {
                child.setProps(newProps);
            }
        });
    } else if (children instanceof Block) {
        children.setProps(newProps);
    }
  }

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      if(this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      if(this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  _compile() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map(
          (component) => `<div data-id="${component._id}"></div>`,
        );
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = this._createDocumentElement("template");
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(
            `[data-id="${component._id}"]`,
          );

          stub?.replaceWith(component.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

        stub?.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  _render() {
    this._removeEvents();
    const block = this._compile();

    if(this._element) {
      if (this._element.children.length === 0) {
        this._element.appendChild(block);
      } else {
        this._element.replaceChildren(block);
      }
    }

    this._addEvents();
  }

  render(): string {
    return "";
  }

  getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Элемент не создан');
    }
    return this._element;
  }

  _makePropsProxy(props: TBlockProps): TBlockProps {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get(target: TBlockProps, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: TBlockProps, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    return document.createElement(tagName)  as HTMLTemplateElement;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}
