import UsersApi from "../api/users";
import { TUsersSearchRequest } from "../utils/types";

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
  } catch (error: any) {
    window.store.set({ usersSearchError: error.reason });
  } finally {
    window.store.set({ isLoadingUserSearch: false });
  }
}
