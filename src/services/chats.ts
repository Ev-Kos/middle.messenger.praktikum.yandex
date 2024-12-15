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
  window.store.set({ isLoadingChangeChats: true });
  try {
    const newChatId = await chatsApi.createChat(model);
    const chats = window.store.state.chats
    if(newChatId) {
      window.store.set({ newChatId });
      const avatar = window.store.state.chatAvatarFile
      if(!avatar) {
        window.store.set({isCreateChatModal: false})
        const newChat = {
          //@ts-ignore
          id: newChatId.id,
          title: window.store.state.newChatTitle,
          avatar: null,
          unread_count: 0,
          created_by: 0,
          last_message: {}
        }
        if(chats) {
          const newChats = [newChat, ...chats]
          window.store.set({ chats: newChats })
        }
      }
      if(avatar) {
        //@ts-ignore
        await uploadChatAvatar(newChatId.id, avatar)
        const newAvatar = window.store.state.uploadedChatAvatar
        const newChat = {
          //@ts-ignore
          id: newChatId.id,
          title: window.store.state.newChatTitle,
          avatar: newAvatar,
          unread_count: 0,
          created_by: window.store.state.user?.id,
          last_message: {}
        }
        if(chats) {
          const newChats = [newChat, ...chats]
          window.store.set({ chats: newChats, chatAvatarFile: null, chatAvatar: null })
        }
      }
      window.store.set({ isCreateChat: true, chatAvatarFile: null, chatAvatar: null })
    }
  } catch (error: any) {
    window.store.set({ createChatError: error.reason });
  } finally {
    window.store.set({  isLoadingChangeChats: false, isCreateChat: false })
  }
}

export const uploadChatAvatar = async (id: number, file: File) => {
  window.store.set({ isLoadingUploadAvatar: true });
  try {
    const uploadChatAvatar = await chatsApi.uploadChatAvatar(id, file);
    //@ts-ignore
    window.store.set({ isCreateChatModal: false, uploadedChatAvatar: uploadChatAvatar.avatar });
  } catch (error: any) {
    window.store.set({ uploadChatAvatarError: error.reason });
  } finally {
    window.store.set({ isLoadingUploadAvatar: false });
  }
}

export const deleteChat = async (data: TDeleteChatRequest) => {
	window.store.set({ isLoadingChangeChats: true });
	try {
		await chatsApi.deleteChat(data);
    const deleteChatId = window.store.state.activeChatId
    const chats = window.store.state.chats
    if(chats) {
      const newChats = chats.filter((item: TGetChatsResponse) => item.id !== deleteChatId)
      window.store.set({isOpenActionsWithChatModal: !window.store.state.isOpenActionsWithChatModal, chats: newChats, activeChatId: null})
    }
    if(Array.isArray(chats) && chats.length < 15) {
      window.store.set({ isScroll: false });
    }
	} catch (error: any) {
		window.store.set({ isDeleteChatError: error.reason });
	} finally {
		window.store.set({ isLoadingChangeChats: false });
	}
}
