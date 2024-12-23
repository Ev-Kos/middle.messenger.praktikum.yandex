import Block from "../../core/block";
import { ChangeIcon, PlusIcon } from "../icons";

type TAddDeleteUserModal = {
  onClickAddUser: () => void;
  onClickDeleteUser: () => void;
  onClickDeleteChat: (id?: number) => void;
  onClickChangeChatAvatar: () => void;
}

type TBtn = {
  onClick: () => void;
  text: string;
  isDeleteUser: boolean;
  isDeleteChat: boolean;
  isChangeChatAvatar: boolean;
}

class Button extends Block {
  constructor(props: TBtn) {
    super("button", {
      ...props,
      className: "chat-modal__field",
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick
      },
      PlusIcon: new PlusIcon({
        color: "#3369F3",
        width: "12",
        height: "12"
      }),
      ChangeIcon: new ChangeIcon
    });
  }

  public render(): string {
    return `
      {{#if isDeleteChat}}
        <div class="chat-modal__icon chat-modal__icon_delete">
          <div class="chat-modal__icon-dash"></div>
        </div>
      {{else if isChangeChatAvatar}}
      <div class="chat-modal__icon">
        {{{ChangeIcon}}}
        </div>
      {{else}}
        <div class="{{#if isDeleteUser}}chat-modal__icon_rotate{{else}}chat-modal__icon{{/if}}">
          {{{PlusIcon}}}
        </div>
      {{/if}}
      <p class="chat-modal__text">{{text}}</p>
    `
  }
}

export default class ActionsWithChatModal extends Block {
  constructor(props: TAddDeleteUserModal) {
    super("div", {
      className: "chat-modal-actions-chat",
      AddUserButton: new Button({
        text: "Добавить пользователя",
        onClick: props.onClickAddUser,
        isDeleteUser: false,
        isDeleteChat: false,
        isChangeChatAvatar: false,
      }),
      DeleteUserButton: new Button({
        text: "Удалить пользователя",
        onClick: props.onClickDeleteUser,
        isDeleteUser: true,
        isDeleteChat: false,
        isChangeChatAvatar: false
      }),
      DeleteChatButton: new Button({
        text: "Удалить чат",
        onClick: props.onClickDeleteChat,
        isDeleteUser: false,
        isDeleteChat: true,
        isChangeChatAvatar: false
      }),
      ChangeChatAvatarButton: new Button({
        text: "Изменить аватар чата",
        onClick: props.onClickChangeChatAvatar,
        isDeleteUser: false,
        isDeleteChat: false,
        isChangeChatAvatar: true
      })
    });
  }

  public render(): string {
    return `
      <div class="chat-modal-actions-chat__container">
        {{{AddUserButton}}}
        {{{DeleteUserButton}}}
        {{{ChangeChatAvatarButton}}}
      </div>
      {{{DeleteChatButton}}}
    `
  }
}
