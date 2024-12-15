import { TGetChatsResponse } from "../utils/types";
import EventBus from "./event-bus";

export enum StoreEvents {
  Updated = "Updated",
}

// type TState = {
//   activeChatId: null | number,
//   isOpenActionsWithChatModal: boolean,
//   offsetMessages: number,
//   limitMessages: number,
//   chats: TGetChatsResponse[],
//   chatAvatarFile: File | null,
//   newChatTitle: string | null
// }

export class Store extends EventBus<string> {
  static __instance: unknown;
  public state = {};
  //изменить типизацию
  constructor(defaultState: any) {
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

  public set(nextState: any) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
