import ChatsApi from "../api/chats";
import { TAddOrDeleteUserToChatRequest, TCreateChatRequest, TDeleteChatRequest, TGetChatsRequest, TGetChatsResponse } from "../utils/types";
import WebScoketClass from "./ws";

export const chatsApi = new ChatsApi();

export const getChats = async (model: TGetChatsRequest) => {
  window.store.set({ isLoadingGetChats: true });
  try {
    const chats = await chatsApi.getChats(model);
    window.store.set({ chats });
    if(Array.isArray(chats) && chats.length > 0) {
      window.store.set({ chatsLength: chats.length });
    }
    if(Array.isArray(chats) && chats.length === 0) {
      window.store.set({ chatsLength: null });
    }
    if(Array.isArray(chats) && chats.length > 10) {
      window.store.set({ isScroll: true });
    }
  } catch (error: any) {
    window.store.set({ getChatError: error.reason });
  } finally {
    window.store.set({ isLoadingGetChats: false });
  }
}

export const createChats = async (model: TCreateChatRequest) => {
  window.store.set({ isLoadingChangeChats: true });
  try {
    const newChatRes = await chatsApi.createChat(model);
    //@ts-ignore
    const newChatId = newChatRes.id
    const chats = window.store.state.chats
    if(newChatId) {
      window.store.set({ newChatId });
      const avatar = window.store.state.chatAvatarFile
      if(!avatar) {
        window.store.set({isCreateChatModal: false})
        const newChat = {
          id: newChatId,
          title: window.store.state.newChatTitle,
          avatar: null,
          unread_count: 0,
          created_by: 0,
          last_message: null
        }
        if(chats) {
          const newChats = [newChat, ...chats]
          window.store.set({ chats: newChats })
        }
      }
      if(avatar) {
        await uploadChatAvatar(newChatId, avatar)
        const newAvatar = window.store.state.uploadedChatAvatar
        const newChat = {
          id: newChatId,
          title: window.store.state.newChatTitle,
          avatar: newAvatar,
          unread_count: 0,
          created_by: window.store.state.user?.id,
          last_message: null
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
    const chatAvatar = uploadChatAvatar.avatar

    window.store.set({
      isCreateChatModal: false,
      uploadedChatAvatar: chatAvatar,
      activeChatAvatar: chatAvatar
    });
    if(window.store.state.isClickFileLoad && window.store.state.isChangeChatAvatar) {
      const chats = window.store.state.chats?.map((item) => item.id === window.store.state.activeChatId
        ? {...item, avatar: chatAvatar}
        : item
      )
      window.store.set({ chats: chats, isChangeChatAvatar: false, isClickFileLoad: false});

    }
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
      window.store.set({
        isOpenActionsWithChatModal: !window.store.state.isOpenActionsWithChatModal,
        chats: newChats,
        activeChatId: null,
      })
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

export const addUsersToChat = async (data: TAddOrDeleteUserToChatRequest) => {
	window.store.set({ isLoadingUserToChat: true });
	try {
		await chatsApi.addUsersToChat(data);
    window.store.set({selectedUsers: [], isSelectedUsers: false, isClickAddUserModal: false})
	} catch (error: any) {
		window.store.set({ isAddUserToChatError: error.reason });
	} finally {
		window.store.set({ isLoadingUserToChat: false });
	}
}

export const getChatUsers = async (data: number) => {
	window.store.set({ isLoadingChatUsers: true });
	try {
		const users = await chatsApi.getChatUsers(data);
    window.store.set({partisipants: users})
	} catch (error: any) {
		window.store.set({ isGetChatUsersError: error.reason });
	} finally {
		window.store.set({ isLoadingChatUsers: false });
	}
}

export const deleteUsersFromChat = async (data: TAddOrDeleteUserToChatRequest) => {
	window.store.set({ isLoadingDeleteUser: true });
	try {
		await chatsApi.deleteUsersFromChat(data);
    window.store.set({selectedUsers: [], isSelectedUsers: false, isClickDeleteUserModal: false})
	} catch (error: any) {
		window.store.set({ isDeleteUserToChatError: error.reason });
	} finally {
		window.store.set({ isLoadingDeleteUser: false });
	}
}

export const getTokenChat = async (id: number) => {
	window.store.set({ isLoadingGetToken: true });
	try {
		const token = await chatsApi.getTokenChat(id);
    window.store.set({ activeChatToken: token.token });
	} catch (error: any) {
		window.store.set({ isGetTokenChatError: error.reason });
	} finally {
		window.store.set({ isLoadingGetToken: false });
	}
}

export const wsChat = async (id: number) => {
	await getTokenChat(id);
	const { user, activeChatToken, offsetMessages } = window.store.state;

	let interval;
  const data = {
    user_id: Number(user?.id),
	  chat_id: id,
	  token_value: String(activeChatToken),
	  content: String(offsetMessages)
  }
  const socket = new WebScoketClass(data);
	if (user && activeChatToken && offsetMessages) {
    if (socket && interval) {
			clearInterval(interval);
		}
		socket.connect();
		interval = setInterval(() => {
			socket.ping();
		}, 10000);
		window.socket = socket;
	}
};

export const getNewMessagesCount = async (id: number) => {
	window.store.set({ isLoadingNewMessagesCount: true });
	try {
		const unreadCount = await chatsApi.getNewMessagesCount(id);
    // @ts-ignore
    const newUnreadCount = unreadCount.unread_count
    const chats = window.store.state.chats
    if (newUnreadCount) {
      const newChats = chats?.map((item => item.id === id
        ? {...item, unread_count: newUnreadCount}
        : item
      ))
      window.store.set({ chats: newChats })
    }
	} catch (error: any) {
		window.store.set({ newMessagesCountError: error.reason });
	} finally {
		window.store.set({ isLoadingNewMessagesCount: false });
	}
};

