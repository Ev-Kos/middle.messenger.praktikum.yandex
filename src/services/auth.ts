import AuthApi from "../api/auth";
import { ROUTES } from "../utils/constants";

const authApi = new AuthApi();

export const singIn = async (model: any) => {
  window.store.set({ isLoading: true });
	try {
		await authApi.singIn(model);
		window.router.go(ROUTES.chat);
	} catch (error: any) {
		window.store.set({ error: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};

// export const checkSingInUser = async () => {
//   window.store.set({ isLoading: true });
//   try {
//     const user = await authApi.me();
//     window.router.go(ROUTER.cats);
//     window.store.set({ user });
//   } catch (responsError) {
//     const error = await responsError.json();
//     window.store.set({ loginError: error.reason });
//   } finally {
//     window.store.set({ isLoading: false });
//   }
// };
