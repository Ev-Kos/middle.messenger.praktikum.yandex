import AuthApi from "../api/auth";
import { ROUTES } from "../utils/constants";
import { TSingInRequest, TSingUpRequest } from "../utils/types";

const authApi = new AuthApi();

// public async execute(operation: () => Promise<any>): Promise<void> {
//   window.store.set({ isLoading: true });
//   try {
//       const response = await operation();
//       if (typeof response === 'object' && response !== null) {
//           const result = await JSON.parse((response as any).response);
//           if (this._fieldForDisplay) {
//               window.store.set({ [this._fieldForDisplay]: result })
//           }
//           return result;
//       }

//       return response;
//   } catch (error) {
//       this.handleError(error);
//   } finally {
//       window.store.set({ isLoading: false });
//   }
// }

export const singIn = async (model: TSingInRequest) => {
  window.store.set({ isLoading: true });
	try {
		const response = await authApi.singIn(model)
    //await checkSingInUser();
    if(response) {
      await checkSingInUser();
      window.router.go(ROUTES.chat);
      console.log('singIn')
    }

    //window.router.go(ROUTES.chat);
    console.log('singIn')
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
    return false
    //window.store.set({ singInError: error.reason });
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
