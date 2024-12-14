import ChatsApi from "../api/chats";
import { TCreateChatRequest, TGetChatsRequest, TGetChatsResponse } from "../utils/types";

const chatsApi = new ChatsApi();

export const getChats = async (model: TGetChatsRequest) => {
  window.store.set({ isLoading: true });
  try {
    const chats = await chatsApi.getChats(model);
    window.store.set({ chats });
    if(Array.isArray(chats) && chats.length > 0) {
      window.store.set({ chatsLength: chats.length });
    }
    if(Array.isArray(chats) && chats.length > 14) {
      window.store.set({ isScroll: true });
    }
  } catch (error: any) {
    window.store.set({ getChatError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
}

export const createChats = async (model: TCreateChatRequest) => {
  window.store.set({ isLoading: true });
  try {
    const newChatId = await chatsApi.createChat(model);
    if(newChatId) {
      window.store.set({ newChatId });
      //@ts-ignore
      const avatar = window.store.state.chatAvatarFile
      if(avatar) {
        //@ts-ignore
        await uploadChatAvatar(newChatId.id, avatar)
      }
      getChats({
        //@ts-ignore
        offset: window.store.state.offsetMessages,
        //@ts-ignore
        limit: window.store.state.limitMessages,
      })
    }
  } catch (error: any) {
    window.store.set({ getChatError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
}

export const uploadChatAvatar = async (id: number, file: File) => {
  window.store.set({ isLoading: true });
  try {
    const updatedChat = await chatsApi.uploadChatAvatar(id, file);
    //@ts-ignore
    if(updatedChat.id) {
      //@ts-ignore
      const chats = window.store.state.chats.map((item: TGetChatsResponse) => item.id === updatedChat.id)
      window.store.set({ chats });
    }
  } catch (error: any) {
    window.store.set({ uploadChatAvatarError: error.reason });
  } finally {
    window.store.set({ isLoading: false });
  }
}
