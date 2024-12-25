import AuthApi from "../api/auth";
import { ROUTES } from "../utils/constants";
import { TErrorApi, TSingInRequest, TSingUpRequest } from "../utils/types";
import { getChats } from "./chats";

const authApi = new AuthApi();

export const singIn = async (model: TSingInRequest) => {
  window.store.set({ isLoadingSingIn: true });
  window.store.set({ singInError: null });
	try {
		const response = await authApi.singIn(model)
    if(response) {
      await checkSingInUser();
      window.router.go(ROUTES.chat);
    }
	} catch (error) {
		window.store.set({ singInError: (error as TErrorApi).reason });
	} finally {
		window.store.set({ isLoadingSingIn: false });
	}
}

export const singUp = async (model: TSingUpRequest) => {
	window.store.set({ isLoadingSingUp: true });
	try {
		await authApi.singUp(model);
    await checkSingInUser();
		window.router.go(ROUTES.chat);
	} catch (error) {
		window.store.set({ singUpError: (error as TErrorApi).reason });
	} finally {
		window.store.set({ isLoadingSingUp: false });
	}
}

export const checkSingInUser = async () => {
  try {
    const user = await authApi.currentUser();
    window.store.set({ user });
    if(!window.store.state.chats) {
      await getChats({
        limit: Number(window.store.state.limitChat),
        offset: Number(window.store.state.offsetChat)
      })
    }
    return true
  }
  catch (error) {
    window.store.set({ singInError: (error as TErrorApi).reason });
    return false
  }
}

export const logout = async () => {
	try {
		await authApi.logout();
    window.store.set({chats: null, user: null});
    window.router.go(ROUTES.login);
	} catch (error) {
		window.store.set({ logoutError: (error as TErrorApi).reason });
	}
}
