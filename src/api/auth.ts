import HTTPTransport from "../core/HTTPTransport";
import { TErrorApi, TSingInRequest } from "../utils/types";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {

  async singIn(data: TSingInRequest): Promise<void | TErrorApi> {
    return authApi.post("/signin", { data });
    //return authApi.post<void | TErrorApi>("/signup", { data });
  }

  // async create(data: CreateUser): Promise<SignUpResponse> {
  //   return authApi.post<SignUpResponse>("/signup", { data });
  // }

  // async me(): Promise<UserDTO | APIError> {
  //   return authApi.get("/user");
  // }

  // async logout(): Promise<void | APIError> {
  //   return authApi.post("/logout");
  // }
}
