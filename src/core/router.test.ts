import Router, { BlockRouter } from './router.ts';
import Block from '../core/block.ts';
import sinon from "sinon";
import { expect } from 'chai';

describe('Router', () => {
    let router: Router;
    let blockRouter: BlockRouter

    beforeEach(() => {
      const root = document.createElement('div');
      root.id = 'app';
      document.body.appendChild(root);
      router = new Router('#app');
      class TestBlock extends Block {
        render() {
          return 'test';
        }
      }
      blockRouter = TestBlock
    });

    it('Должен добавлять маршруты', () => {
        router.use('/login', blockRouter);
        router.use('/main', blockRouter);
        expect(router.routes.length).to.equal(2);
    });

    it('Должен отдавать правильный маршрут', () => {
      router.use('/login', blockRouter)
      router.start();
      router.go('/login');
      expect(router.currentRoute).to.equal(router.getRoute('/login'));
    });

    it('Должен переходить назат', () => {
      router.use('/login', blockRouter)
      router.use('/main', blockRouter);
      router.start();

      router.go('/main');
      router.go('/login');
      const back = sinon.spy(router, 'back');
      router.back();
      expect(back.calledOnce).to.be.true;
    });

    it('Должен переходить вперед', () => {
      router.use('/login', blockRouter)
      router.use('/main', blockRouter);
      router.start();

      router.go('/main');
      router.go('/login');
      const forward = sinon.spy(router, 'forward');

      router.forward();
      expect(forward.calledOnce).to.be.true;
    });
});
