import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { getDate } from './utils/functions/getDate';
import { ROUTES } from './utils/constants';
import { Store, StoreEvents } from './core/store';
import Router from './core/router';
import { checkSingInUser } from './services/auth';

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

const store = window.store = new Store({
	isLoading: false,
	user: null,
	singInError: null,
  singUpError: null,
});

window.store = store
store.on(StoreEvents.Updated, (prevState: any, newState: any) => {
  console.log("prevState", prevState);
  console.log("newState", newState);
});

const APP_ROOT_ELEMNT = "#app";
const router = new Router(APP_ROOT_ELEMNT);
window.router = router;

const protectedRouter = async () => {
  await checkSingInUser();

  router
    .use(ROUTES.register, Pages.RegistrationPage)
    .use(ROUTES.chat, Pages.ChatPage)
    .use(ROUTES.profile, Pages.ProfilePage)
    .use(ROUTES.login, Pages.LoginPage)
    .start();
};

protectedRouter();
