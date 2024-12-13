import HTTPTransport from "../core/HTTPTransport";
import { TErrorApi, TGetChatsRequest, TGetChatsResponse } from "../utils/types";

const chatsApi = new HTTPTransport("/chats");

export default class ChatsApi {

  async getChats(data: TGetChatsRequest): Promise< TGetChatsResponse | TErrorApi > {
    return chatsApi.get("", { data } );
  }
}
