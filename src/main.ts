import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { getDate } from './utils/functions';
import renderDOM from './core/render-dom';

const pages = {
  navigation: [ Pages.NavigationPage ],
  login: [ Pages.LoginPage],
  registration: [ Pages.RegistrationPage],
  chat: [ Pages.ChatPage ],
  profile: [ Pages.ProfilePage],
  500: [ Pages.NotFoundPage ],
  400: [ Pages.ErrorPage ],
};

Handlebars.registerHelper('getDate', function (date, isGotMessage, isOnlyTime) {
  return getDate(date, isGotMessage, isOnlyTime)
})

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  if (typeof source === "function") {
    renderDOM(new source({}));
    return;
  }
  const container = document.getElementById('app')!;
  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
  history.pushState({ page }, "", `${page}`);
}

window.addEventListener('popstate', (event) => {
  if (event.state && event.state.page) {
    navigate(event.state.page);
  } else {
    navigate('navigation');
  }
})

document.addEventListener('DOMContentLoaded', () => navigate('navigation'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
})
