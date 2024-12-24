import Block from "./block";
import Route from "./route";

export interface RouteInterface {
	render: () => void;
	match: (path: string) => boolean;
	leave: () => void;
}
export type BlockRouter = new (...args: any[]) => Block;

export default class Router {
  static __instance: Router | null;
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

  use(pathname: string, block: BlockRouter) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.target as Window;
      this._onRoute(target.location.pathname);
  });

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
