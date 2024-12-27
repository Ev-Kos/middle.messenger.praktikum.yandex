import {JSDOM} from 'jsdom'

const jsdom = new JSDOM('<body></body>', {
  url: 'https://test.ru/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
