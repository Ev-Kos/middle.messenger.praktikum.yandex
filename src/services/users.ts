import UsersApi from "../api/users";
import { TChangePasswordRequest, TErrorApi, TSingUpRequest, TUsersSearchRequest } from "../utils/types";

const usersApi = new UsersApi();

export const usersSearch = async (model: TUsersSearchRequest) => {
  window.store.set({ isLoadingUserSearch: true });
  try {
    const users = await usersApi.usersSearch(model);
    window.store.set({ users });
    if (Array.isArray(users) && users.length > 0) {
      window.store.set({ usersLength: users.length });
    }
    if (Array.isArray(users) && users.length === 0) {
      window.store.set({ isSearchUsers: true, usersLength: null });
    }
    if (Array.isArray(users) && users.length > 5) {
      window.store.set({ isUserScroll: true });
    }
  } catch (error) {
    window.store.set({ usersSearchError: (error as TErrorApi).reason });
  } finally {
    window.store.set({ isLoadingUserSearch: false });
  }
}

export const changeUserAvatar = async (file: File) => {
  window.store.set({ isLoadingUploadUserAvatar: true });
  try {
    const user = await usersApi.changeUserAvatar(file);
    window.store.set({user: user, userAvatar: null, userAvatarFile: null, isClickFileLoad: false})
  } catch (error) {
    window.store.set({ uploadUserAvatarError: (error as TErrorApi).reason });
  } finally {
    window.store.set({ isLoadingUploadUserAvatar: false });
  }
}

export const changeProfile = async (data: TSingUpRequest) => {
  window.store.set({ isLoadingChangeProfile: true });
  try {
    const user = await usersApi.changeProfile(data);
    window.store.set({user: user, isNotChange: true})
  } catch (error) {
    window.store.set({ changeProfileError: (error as TErrorApi).reason });
  } finally {
    window.store.set({ isLoadingChangeProfile: false });
  }
}

export const changePassword = async (data: TChangePasswordRequest) => {
  window.store.set({ isLoadingChangePassword: true });
  try {
    await usersApi.changePassword(data);
    window.store.set({isNotChange: true, isChangePassword: false})
  } catch (error) {
    window.store.set({ changePasswordError: (error as TErrorApi).reason });
  } finally {
    window.store.set({ isLoadingChangePassword: false });
  }
}
