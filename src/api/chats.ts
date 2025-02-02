import HTTPTransport from "../core/HTTPTransport";
import {
  TAddOrDeleteUserToChatRequest,
  TCreateChatRequest,
  TCreateChatResponse,
  TDeleteChatRequest,
  TDeleteChatResponse,
  TErrorApi,
  TGetChatsRequest,
  TGetChatsResponse,
  TNewMessagesCountResponse,
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

  async addUsersToChat(data: TAddOrDeleteUserToChatRequest): Promise< void | TErrorApi > {
    return chatsApi.put("/users", { data });
  }

  async getChatUsers(data: number) {
    return chatsApi.get(`/${data}/users`);
  }

  async deleteUsersFromChat(data: TAddOrDeleteUserToChatRequest): Promise< void | TErrorApi > {
    return chatsApi.delete("/users", { data });
  }

  async getTokenChat(data: number) {
    return chatsApi.post(`/token/${data}`);
  }

  async getNewMessagesCount(id: number): Promise<TNewMessagesCountResponse | TErrorApi> {
		return chatsApi.get(`/new/${id}`);
	}
}
