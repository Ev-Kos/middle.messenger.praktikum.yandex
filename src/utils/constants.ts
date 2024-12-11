import Router from "../core/router";

export enum ROUTES {
	login = "/",
	register = "/sign-up",
	chat = "/messenger",
	profile = "/settings",
}

const APP_ROOT_ELEMNT = "#app";
export const router = new Router(APP_ROOT_ELEMNT)
