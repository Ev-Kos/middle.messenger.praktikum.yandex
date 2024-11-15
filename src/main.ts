import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { contactList } from './utils/contact-list';
import { getDate } from './utils/functions';

const pages = {
  navigation: [ Pages.NavigationPage ],
  login: [ Pages.LoginPage],
  registration: [ Pages.RegistrationPage],
  chat: [ Pages.ChatPage, {contactList}],
  profile: [ Pages.ProfilePage],
  500: [ Pages.ErrorPage, {error: "500", text:"Мы уже фиксим"}],
  400: [ Pages.ErrorPage, {error: "400", text:"Не туда попали"}],
};

Handlebars.registerHelper('getDate', function (date, isGotMessage, isOnlyTime) {
  return getDate(date, isGotMessage, isOnlyTime)
})

Object.entries(Components).forEach(([ name, template ]) => {
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
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
