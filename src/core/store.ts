import { TGetChatsResponse, TMessages, TUser } from "../utils/types";
import EventBus from "./event-bus";

export enum StoreEvents {
  Updated = "Updated",
}

type TState = {
  activeChatId?: null | number,
  isOpenActionsWithChatModal?: boolean,
  offsetChat?: number,
  limitChat?: number,
  isLoadingSingIn?: boolean,
  isLoadingSingUp?: boolean,
  isLoadingChangeChats?: boolean,
  chats?: TGetChatsResponse[],
  chatAvatarFile?: File | null,
  newChatId?: { id: number },
  newChatTitle?: string | null,
  uploadedChatAvatar?: string | null,
  user?: TUser | null,
  users?: TUser[] | [],
  isLoadingUserSearch?: boolean,
  partisipants?: TUser[],
  isClickAddUserModal?: boolean,
  selectedUsers?: TUser[],
  userAvatarFile?: File | null,
  isClickFileLoad?: boolean,
  isOpenFileModal?: boolean,
  isNotChange?: boolean,
  messagesArr?: TMessages[],
  newMessage?: TMessages | null,
  activeChatToken?: string,
  offsetMessages?: string,
  chatScrolled?: boolean,
  idsChats?: number[],
  isNewCount?: boolean,
  isMessagePhoto?: boolean,
  isLoadingUploadResouse?: boolean,
  isLoadingUploadUserAvatar?: boolean,
  messagePhotoFile?: File | null,
  uploadedMessagePhoto?: {path: string, id: number},
  isChangeChatAvatar?: boolean,
  isLoadingUploadAvatar?: boolean,
}

export class Store extends EventBus<string> {
  static __instance: Store;
  public state:TState = {};

  constructor(defaultState: {}) {
    if (Store.__instance) {
      return Store.__instance as Store;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: {}) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
