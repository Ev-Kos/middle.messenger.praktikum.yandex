import Block from "../../core/block";
import { PlusIcon } from "../icons";

type TAddDeleteUserModal = {
  onClickAddUser: () => void;
  onClickDeleteUser: () => void;
}

type TBtn = {
  onClick: () => void;
  text: string;
  isDelete: boolean;
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
      DelIcon: new PlusIcon({
        color: "#3369F3",
        width: "12",
        height: "12"
      })
    });
  }

  public render(): string {
    return `
        <div class="{{#if isDelete}}chat-modal__icon_rotate{{else}}chat-modal__icon{{/if}}">
          {{{PlusIcon}}}
        </div>
        <p class="chat-modal__text">{{text}}</p>
    `
  }
}


export default class AddDeleteUserModal extends Block {
  constructor(props: TAddDeleteUserModal) {
    super("div", {
      className: "chat-modal",
      AddButton: new Button({
        text: "Добавить пользователя",
        onClick: props.onClickAddUser,
        isDelete: false
      }),
      DeleteButton: new Button({
        text: "Удалить пользователя",
        onClick: props.onClickDeleteUser,
        isDelete: true
      })
    });
  }

  public render(): string {
    return `
      {{{AddButton}}}
      {{{DeleteButton}}}
    `
  }
}
