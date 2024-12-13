import ChatsApi from "../api/chats";
import { TGetChatsRequest } from "../utils/types";

const chatsApi = new ChatsApi();

export const getChats = async (model: TGetChatsRequest) => {
  window.store.set({ isLoading: true });
  try {
    const chats = await chatsApi.getChats(model);
    window.store.set({ chats });
    if(Array.isArray(chats) && chats.length > 0) {
      window.store.set({ chatsLength: chats.length });
    }
  } catch (error: any) {
    window.store.set({ getChatError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
};
