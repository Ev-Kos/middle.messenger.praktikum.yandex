import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { getDate } from './utils/functions/getDate';
import { getChatsData, ROUTES } from './utils/constants';
import { Store, StoreEvents } from './core/store';
import Router from './core/router';
import { checkSingInUser } from './services/auth';
import { getChats } from './services/chats';

declare global {
	interface Window {
		router: Router;
		store: Store;
	}
}

Handlebars.registerHelper('getDate', function (date, isGotMessage, isOnlyTime) {
  return getDate(date, isGotMessage, isOnlyTime)
})

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

window.store = new Store({
	isLoading: false,
	user: null,
	singInError: null,
  singUpError: null,
  logoutError: null,
  getChatError: null,
  chats: []
});

window.store.on(StoreEvents.Updated, (prevState: any, newState: any) => {
  console.log("prevState", prevState);
  console.log("newState", newState);
});

const APP_ROOT_ELEMNT = "#app";
window.router = new Router(APP_ROOT_ELEMNT);
const check = await checkSingInUser();

window.router
  .use(ROUTES.register, Pages.RegistrationPage)
  .use(ROUTES.chat, Pages.ChatPage)
  .use(ROUTES.profile, Pages.ProfilePage)
  .use(ROUTES.login, Pages.LoginPage)
  .use('*', Pages.NotFoundPage)
  .start();

if (!check) {
  window.router.go(ROUTES.login);
} else {
  const currentPath = window.location.pathname;
  if (currentPath === ROUTES.login || currentPath === ROUTES.register) {
      window.router.go(ROUTES.chat);
  } else {
      window.router.go(currentPath);
  }
}

if(window.location.pathname === ROUTES.chat) {
  getChats(getChatsData)
}
