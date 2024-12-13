import AuthApi from "../api/auth";
import { ROUTES } from "../utils/constants";
import { TSingInRequest, TSingUpRequest } from "../utils/types";

const authApi = new AuthApi();

export const singIn = async (model: TSingInRequest) => {
  window.store.set({ isLoading: true });
	try {
		const response = await authApi.singIn(model)
    if(response) {
      await checkSingInUser();
      window.router.go(ROUTES.chat);
    }
	} catch (error: any) {
		window.store.set({ singInError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
}

export const singUp = async (model: TSingUpRequest) => {
	window.store.set({ isLoading: true });
	try {
		await authApi.singUp(model);
    await checkSingInUser();
		window.router.go(ROUTES.chat);
	} catch (error: any) {
		window.store.set({ singUpError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const checkSingInUser = async () => {
  window.store.set({ isLoading: true });
  try {
    const user = await authApi.currentUser();
    window.store.set({ user });
    return true
  }
  catch (error: any) {
    window.store.set({ singInError: error.reason });
    return false
  }
  finally {
    window.store.set({ isLoading: false });
  }
};

export const logout = async () => {
	window.store.set({ isLoading: true });
	try {
		await authApi.logout();
    window.store.set({ user: null });
    window.router.go(ROUTES.login);
		window.store.set({ logoutError: null });
	} catch (error: any) {
		window.store.set({ logoutError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
