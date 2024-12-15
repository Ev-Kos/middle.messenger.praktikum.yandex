import Block, { TBlockProps } from "./block";
import { RouteInterface } from "./router";

export default class Route implements RouteInterface {
  private _pathname: string;
  //private readonly _blockClass: typeof Block | null = null;
  private _blockClass: any;
  private _block: Block | null = null;
  private readonly _props: TBlockProps = {};

  constructor(pathname: string, view: any, props: TBlockProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.dispatchComponentDidUnmount();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  _renderDom(query: string, block: Block) {
    const root = document.querySelector(query);
    if(root) {
      root.innerHTML = "";
      root.append(block.getContent());
    }
  }

  render() {
    if (!this._block) {
      if(this._blockClass) {
        this._block = new this._blockClass({});
      }
    }
    if(this._block) {
      this._renderDom(this._props.rootQuery, this._block);
      this._block.componentDidMount();
    }
  }
}
