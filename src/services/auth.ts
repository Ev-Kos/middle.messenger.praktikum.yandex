import AuthApi from "../api/auth";
import { ROUTES } from "../utils/constants";
import { TSingInRequest, TSingUpRequest } from "../utils/types";

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
	} catch (error: any) {
		window.store.set({ singInError: error.reason });
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
	} catch (error: any) {
		window.store.set({ singUpError: error.reason });
	} finally {
		window.store.set({ isLoadingSingUp: false });
	}
}

export const checkSingInUser = async () => {
  try {
    const user = await authApi.currentUser();
    window.store.set({ user });
    return true
  }
  catch (error: any) {
    window.store.set({ singInError: error.reason });
    return false
  }
}

export const logout = async () => {
	try {
		await authApi.logout();
    window.store.set({ singInError: null });
    window.router.go(ROUTES.login);
	} catch (error: any) {
		window.store.set({ logoutError: error.reason });
	}
}
