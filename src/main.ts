import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { getDate } from './utils/functions/getDate';
import { ROUTES } from './utils/constants';
import { Store } from './core/store';
import Router from './core/router';
import { checkSingInUser } from './services/auth';
import { getChats } from './services/chats';
import { getImage } from './utils/functions/getImage';
import WebScoketClass from './services/ws';

declare global {
	interface Window {
		router: Router;
		store: Store;
    socket: WebScoketClass;
	}
}

Handlebars.registerHelper('getDate', function (date, isChatCard, isOnlyTime) {
  return getDate(date, isChatCard, isOnlyTime)
})

Handlebars.registerHelper('getImage', function (path) {
  return getImage(path)
})

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

window.store = new Store({
  limitChat: 15,
  offsetChat: 0,
  partisipants: [],
  selectedUsers: [],
  isNotChange: true,
  messagesArr: [],
  offsetMessages: "0",
 });

const APP_ROOT_ELEMNT = "#app";
window.router = new Router(APP_ROOT_ELEMNT);

window.router
.use(ROUTES.login, Pages.LoginPage)
.use(ROUTES.register, Pages.RegistrationPage)
.use(ROUTES.chat, Pages.ChatPage)
.use(ROUTES.profile, Pages.ProfilePage)
.use(ROUTES.servError, Pages.ErrorPage)
.use("*", Pages.NotFoundPage)
.start();

const initApp = async (): Promise<void> => {
  const check = await checkSingInUser();
  const currentPath = window.location.pathname;

  if (!check) {
    window.router.go(ROUTES.login);
    return;
  }

  if (currentPath === ROUTES.login || currentPath === ROUTES.register) {
    window.router.go(ROUTES.chat);
    await getChats({
      limit: Number(window.store.state.limitChat),
      offset: Number(window.store.state.offsetChat)
    })
    return;
  }

  if (currentPath === ROUTES.chat) {
    await getChats({
      limit: Number(window.store.state.limitChat),
      offset: Number(window.store.state.offsetChat)
    })
    return;
  }
  window.router.go(currentPath)
}
initApp().catch(error => {
  console.error(error);
});
