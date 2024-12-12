import HTTPTransport from "../core/HTTPTransport";
import { TSingUpRequest, TSingUpResponse, TErrorApi, TSingInRequest, TUser } from "../utils/types";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {

  async singIn(data: TSingInRequest): Promise<void | TErrorApi> {
    return authApi.post("/signin", { data });
  }

  async singUp(data: TSingUpRequest): Promise<TSingUpResponse | TErrorApi> {
    return authApi.post("/signup", { data });
  }

  async currentUser(): Promise<TUser | TErrorApi> {
    return authApi.get("/user", {});
  }

  // async logout(): Promise<void | APIError> {
  //   return authApi.post("/logout");
  // }
}
