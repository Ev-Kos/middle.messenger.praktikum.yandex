import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { getDate } from './utils/functions/getDate';
import { ROUTES } from './utils/constants';
import { Store, StoreEvents } from './core/store';
import Router from './core/router';
import { checkSingInUser } from './services/auth';
import { getChats } from './services/chats';
import { getImage } from './utils/functions/getImage';

declare global {
	interface Window {
		router: Router;
		store: Store;
	}
}

Handlebars.registerHelper('getDate', function (date, isGotMessage, isOnlyTime) {
  return getDate(date, isGotMessage, isOnlyTime)
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
  limitMessages: 15,
  offsetMessages: 0
 });

// window.store.on(StoreEvents.Updated, (prevState: any, newState: any) => {
//   console.log("prevState", prevState);
//   console.log("newState", newState);
// });

const APP_ROOT_ELEMNT = "#app";
window.router = new Router(APP_ROOT_ELEMNT);
const check = await checkSingInUser();
const currentPath = window.location.pathname;

const protectedRouter = async () => {

  if (!check) {
    window.router.go(ROUTES.login);
  } else {
    if (currentPath === ROUTES.login || currentPath === ROUTES.register) {
        window.router.go(ROUTES.chat);
    } else {
        window.router.go(currentPath);
        if(currentPath === ROUTES.chat) {
          await getChats({
            limit: Number(window.store.state.limitMessages),
            offset: Number(window.store.state.offsetMessages)
          })
        }
    }
  }
	window.router
		.use(ROUTES.login, Pages.LoginPage)
		.use(ROUTES.register, Pages.RegistrationPage)
		.use(ROUTES.chat, Pages.ChatPage)
		.use(ROUTES.profile, Pages.ProfilePage)
		.use("*", Pages.NavigationPage)
		.start();
};

protectedRouter();
