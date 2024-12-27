import Block from './block';
import sinon from 'sinon';
import { expect } from "chai";
import { InputForm } from '../components';

describe('Block', () => {
  let PageComponent: any;
  beforeEach(() => {
    class Page extends Block {
      constructor(props: any) {
        super('div', {
          ...props,
          Input: new InputForm({
            type: 'text',
            text: 'test',
            name: 'test',
          })
        })
      }
      render() {
          return `
              <div>
                  <span id="test-text">{{text}}</span>
                  {{{Input}}}
              </div>
          `
      }
    }
    PageComponent = Page;
})

  it('Должен создать компонент с состоянием из конструктора', () => {
      const text = 'Hello';
      const pageComponent = new PageComponent({text});
      const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

      expect(spanText).to.be.eq(text);
  });

  it('Компонент должен иметь реактивное повдение', () => {
      const newValue = 'New value';
      const pageComponent = new PageComponent({text: "Hello"});
      pageComponent.setProps({text: newValue})
      const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

      expect(spanText).to.be.eq(newValue);
  });

  it('Компонент должен установить события на элемент', () => {
      const clickHadnlerStub = sinon.stub();
      const pageComponent = new PageComponent({
          events: {
              click: clickHadnlerStub
          }
      });
      const event = new MouseEvent('click');
      pageComponent.element?.dispatchEvent(event);

      expect(clickHadnlerStub.calledOnce).to.be.true;
  })

  it('Должен установить пропсы для дочерних копонентов', () => {
    const pageComponent = new PageComponent();
    const newValue = 'New value';
    pageComponent.setPropsForChildren(pageComponent.children.Input, {value: newValue});

    expect(pageComponent.children.Input.props.value).to.be.eq(newValue);
  })

  it('Компонент должен вызвать dispatchComponentDidMount метод', () => {
      const clock = sinon.useFakeTimers();
      const pageComponent = new PageComponent();
      const spyCDM = sinon.spy(pageComponent, 'componentDidMount');
      pageComponent.getContent();
      clock.next();

      setTimeout(() => {
        expect(spyCDM.calledOnce).to.be.true;
    }, 0);
  })
})
