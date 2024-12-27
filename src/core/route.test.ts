import Route from './route.ts';
import Block from '../core/block.ts';
import { expect } from 'chai';

describe('Route Class Tests', () => {
  let route: Route;
  let pathname: string = '/test';
  const props = {
      rootQuery: '#app',
  };

  beforeEach(() => {
    class TestBlock extends Block {
      render() {
          return '<div class="test">it is block</div>';
      }
    };
      route = new Route(pathname, TestBlock, props);
      const root = document.createElement('div');
      root.id = 'app';
      document.body.appendChild(root);
    });

    afterEach(() => {
      const root = document.getElementById('app');
      if (root) {
        root.innerHTML = '';
      }
    });

    it('Должен рендерить блок', () => {
      route.render();
      const container = document.getElementById('app');
      expect(container?.innerHTML).to.contain('it is block');
    });

    it('Должен правильно инициализировать маршрут', () => {
      expect(route.match('/test')).to.be.true;
      expect(route.match('/other-test')).to.be.false;
    });

    it('Должен убирать блок', () => {
      route.render();
      const container = document.getElementById('app');
      expect(container?.innerHTML).to.contain('it is block');

      route.leave();
      expect(container?.innerHTML).to.contain('it is block');
    });
});
