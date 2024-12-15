import HTTPTransport from "../core/HTTPTransport";
import {
  TCreateChatRequest,
  TCreateChatResponse,
  TDeleteChatRequest,
  TDeleteChatResponse,
  TErrorApi,
  TGetChatsRequest,
  TGetChatsResponse,
} from "../utils/types";

const chatsApi = new HTTPTransport("/chats");

export default class ChatsApi {

  async getChats(data: TGetChatsRequest): Promise< TGetChatsResponse | TErrorApi > {
    return chatsApi.get("", { data } );
  }

  async createChat(data: TCreateChatRequest): Promise< TCreateChatResponse | TErrorApi> {
    return chatsApi.post("", { data } );
  }

  async uploadChatAvatar(id: number, file: File): Promise<TGetChatsResponse | TErrorApi> {
    const formData = new FormData();
    formData.append("avatar", file, file.name);
    formData.append("chatId", String(id));
    const data = formData
    return chatsApi.put("/avatar", { data });
  }

  async deleteChat(data: TDeleteChatRequest): Promise< TDeleteChatResponse | TErrorApi > {
    return chatsApi.delete("", { data });
  }
}
