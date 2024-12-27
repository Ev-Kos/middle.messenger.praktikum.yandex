/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import sinon, {SinonStub} from 'sinon';
import HTTPTransport from './HTTPTransport';
import { baseApi } from '../utils/constants';

describe('HTTPTransport', () => {
  const http = new HTTPTransport('/test');
  let request: SinonStub;

  beforeEach(() => {
    request = sinon.stub(http, 'request')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('Если метод отсутствует выбрасывается ошибка', async () => {
    const requestStub = request.rejects(new Error('Нет такого метода'));

    try {
      await http.request(`${baseApi}/test`, { method: undefined });
      expect(requestStub.calledOnce).to.be.true;
    } catch (error) {
      const err = error as Error;
      expect(err.message).to.equal('Нет такого метода');
    }
});

  it('get запрос содержит url, data и метод GET ', async () => {
    const requestStub = request.resolves();
    const options = { data: {id: "id"} };
    await http.get("", options);

    expect(requestStub.calledOnce).to.be.true;
    expect(requestStub.firstCall.args[0]).to.equal(`${baseApi}/test`);
    expect(requestStub.firstCall.args[1].data.id).to.equal('id');
    expect(requestStub.firstCall.args[1]?.method).to.equal('GET');
  });

  it('post запрос содержит url, data и метод и метод POST ', async () => {
    const requestStub = request.resolves();
    const options = { data: {id: "id"} };
    await http.post("", options);

    expect(requestStub.calledOnce).to.be.true;
    expect(requestStub.firstCall.args[0]).to.equal(`${baseApi}/test`);
    expect(requestStub.firstCall.args[1].data.id).to.equal('id');
    expect(requestStub.firstCall.args[1]?.method).to.equal('POST');
  });

  it('put запрос содержит url, data и метод и метод PUT ', async () => {
    const requestStub = request.resolves();
    const options = { data: {id: "id"} };
    await http.put("", options);

    expect(requestStub.calledOnce).to.be.true;
    expect(requestStub.firstCall.args[0]).to.equal(`${baseApi}/test`);
    expect(requestStub.firstCall.args[1].data.id).to.equal('id');
    expect(requestStub.firstCall.args[1]?.method).to.equal('PUT');
  });

  it('patch запрос содержит url, data и метод и метод PATCH ', async () => {
    const requestStub = request.resolves();
    const options = { data: {id: "id"} };
    await http.patch("", options);

    expect(requestStub.calledOnce).to.be.true;
    expect(requestStub.firstCall.args[0]).to.equal(`${baseApi}/test`);
    expect(requestStub.firstCall.args[1].data.id).to.equal('id');
    expect(requestStub.firstCall.args[1]?.method).to.equal('PATCH');
  });

  it('delete запрос содержит url, data и метод и метод DELETE ', async () => {
    const requestStub = request.resolves();
    const options = { data: {id: "id"} };
    await http.delete("", options);

    expect(requestStub.calledOnce).to.be.true;
    expect(requestStub.firstCall.args[0]).to.equal(`${baseApi}/test`);
    expect(requestStub.firstCall.args[1].data.id).to.equal('id');
    expect(requestStub.firstCall.args[1]?.method).to.equal('DELETE');
  });
});
