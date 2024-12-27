import EventBus from "./event-bus";
import {expect} from "chai";

describe('EventBus', () => {
    let eventBus: any;

    beforeEach(() => {
        eventBus = new EventBus<string>();
    });

    it('Должен добавлять слушатель события', () => {
        const onChange = () => {};
        eventBus.on('change', onChange);
        expect(eventBus.listeners['cange']).to.include(onChange);
    });

    it('Должен отдавать ошибку при удалении несуществующего события', () => {
      const callback = () => {};
      expect(() => eventBus.off('event', callback)).to.throw(Error, 'Нет события: event');
    });

    it('Должен удалять слушатель события', () => {
        const onChange = () => {};
        eventBus.on('change', onChange);
        eventBus.off('change', onChange);
        expect(eventBus.listeners['change']).to.not.include(onChange);
    });


    it('Должен вызывать слушатели с переданными данными', () => {
        const callback = (arg1: string, arg2: string) => {
          expect(arg1).to.equal('id');
          expect(arg2).to.equal('value');
      };
        eventBus.on('click', callback);
        eventBus.emit('click', 'id', 'value');
    });
});
