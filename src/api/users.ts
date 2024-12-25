import HTTPTransport from "../core/HTTPTransport";
import { TChangePasswordRequest, TErrorApi, TSingUpRequest, TUser, TUsersSearchRequest } from "../utils/types";

const usersApi = new HTTPTransport("/user");

export default class UsersApi {

  async usersSearch(data: TUsersSearchRequest): Promise<TUser[] | TErrorApi> {
    return usersApi.post("/search", { data });
  }

  async changeUserAvatar(file: File): Promise<TUser | TErrorApi> {
    const formData = new FormData();
    formData.append("avatar", file, file.name);
    const data = formData
    return usersApi.put("/profile/avatar", { data });
  }

  async changeProfile(data: TSingUpRequest): Promise<TUser | TErrorApi > {
    return usersApi.put("/profile", { data });
  }

  async changePassword(data: TChangePasswordRequest): Promise<void | TErrorApi> {
    return usersApi.put("/password", { data });
  }
}
