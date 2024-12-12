import { ROUTES } from "../utils/constants";
import Block from "./block";
import Route from "./route";

export interface RouteInterface {
	render: () => void;
	match: (path: string) => boolean;
	leave: () => void;
}

export default class Router {
  static __instance: unknown;
  private routes: RouteInterface[] = [];
  private history: History | null = null;
  private _currentRoute: RouteInterface | null = null;
  private _rootQuery: string = "";

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance as Router;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    //@ts-ignore
    const { user } = window.store.state;
    if (!user && String(this._currentRoute) !== ROUTES.register) {
			this.go(ROUTES.login);
		}
//исправить типизацию
    window.onpopstate = ((event: any) => {
			this._onRoute(event.currentTarget.location.pathname);
		}).bind(this);

		this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    //route.render(route, pathname);
    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back()
  }

  forward() {
    this.history?.forward()
  }

  getRoute(pathname: string) {
    const route = this.routes.find(route => route.match(pathname));
    if(!route) {
      return this.routes.find(route => route.match('*'))
    }
    return route
  }
}
