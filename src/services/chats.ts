import ChatsApi from "../api/chats";
import { TCreateChatRequest, TDeleteChatRequest, TGetChatsRequest, TGetChatsResponse } from "../utils/types";

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
    let uploadNewChatAvatar;
    console.log(1)
    if(newChatId) {
      window.store.set({ newChatId });
      const avatar = window.store.state.chatAvatarFile
      console.log(2)
      if(!avatar) {
        console.log(3)
        window.store.set({isCreateChatModal: false})
      }
      if(avatar) {
        console.log(4)
        uploadNewChatAvatar = await uploadChatAvatar(newChatId.id, avatar)
      }
      // getChats({
      //   offset: window.store.state.offsetMessages,
      //   limit: window.store.state.limitMessages,
      // })
      console.log(6)
      const a = {id: newChatId.id}
      console.log(a, 7)
      const newChat = {
        //@ts-ignore
        id: newChatId.id,
        title: window.store.state.newChatTitle,
        //@ts-ignore
        avatar: uploadNewChatAvatar.avatar ? uploadNewChatAvatar.avatar : null,
        unread_count: 0,
        //@ts-ignore
        created_by: uploadNewChatAvatar.created_by ? uploadNewChatAvatar.created_by : null,
        last_message: {}
      }
      console.log(newChat, 8)
      const chats = [newChat, ...window.store.state.chats]

      window.store.set({ chats });
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
    window.store.set({ chatAvatar: null, chatAvatarFile: null, isCreateChatModal: false });
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

export const deleteChat = async (data: TDeleteChatRequest) => {
	window.store.set({ isLoading: true });
	try {
		await chatsApi.deleteChat(data);
    // const chats = getChats({
    //     offset: window.store.state.offsetMessages,
    //     limit: window.store.state.limitMessages,
    //   })
    //   window.store.set({ activeChatId: null});
    const deleteChatId = window.store.state.activeChatId
    // if(deleteChatId) {
    //   const chats = window.store.state.chats.filter((item: TGetChatsResponse) => item.id !== deleteChatId)
     window.store.set({ chats: [], activeChatId: null});
    //   console.log(chats)
    // }
    window.store.set({isOpenActionsWithChatModal: !window.store.state.isOpenActionsWithChatModal, isDeleteChat: true})
	} catch (error: any) {
		window.store.set({ deleteChatError: error.reason });
	} finally {
		window.store.set({ isLoading: false });
	}
};
