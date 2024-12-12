import AuthApi from "../api/auth";
import { ROUTES } from "../utils/constants";
import { TSingInRequest, TSingUpRequest } from "../utils/types";

const authApi = new AuthApi();

export const singIn = async (model: TSingInRequest) => {
  window.store.set({ isLoading: true });
	try {
		await authApi.singIn(model);
		window.router.go(ROUTES.chat);
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
		window.router.go(ROUTES.chat);
	} catch (error: any) {
		window.store.set({ singUpError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

export const checkSingInUser = async () => {
  window.store.set({ isLoading: true });
  console.log(1)
  try {
    const user = await authApi.currentUser();
    window.router.go(ROUTES.chat);
    window.store.set({ user });
    console.log(user)
  }
  catch (error: any) {
    console.log(error)
    //window.store.set({ singInError: error.reason });
  }
  finally {
    window.store.set({ isLoading: false });
  }
};
