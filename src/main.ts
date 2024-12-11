import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import { getDate } from './utils/functions';
import Router from './core/router';
import { router, ROUTES } from './utils/constants';

Handlebars.registerHelper('getDate', function (date, isGotMessage, isOnlyTime) {
  return getDate(date, isGotMessage, isOnlyTime)
})

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});


router
  .use(ROUTES.register, Pages.RegistrationPage)
  .use(ROUTES.chat, Pages.ChatPage)
  .use(ROUTES.profile, Pages.ProfilePage)
  .use(ROUTES.login, Pages.LoginPage)
  .start();
