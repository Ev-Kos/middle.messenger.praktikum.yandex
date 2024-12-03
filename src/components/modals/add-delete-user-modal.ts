import Block from "../../core/block";
import { PlusIcon } from "../icons";

type TAddDeleteUserModal = {
  onClickAddUser: () => void;
  onClickDeleteUser: () => void;
}

type TBtn = {
  onClick: () => void;
  text: string;
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
      PlusIcon: new PlusIcon,
      DelIcon: new PlusIcon
    });
  }

  public render(): string {
    return `
        <div class="chat-modal__icon">
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
      PlusIcon: new PlusIcon,
      DelIcon: new PlusIcon,
      AddButton: new Button({
        text: "Добавить пользователя",
        onClick: props.onClickAddUser
      }),
      DeleteButton: new Button({
        text: "Удалить пользователя",
        onClick: props.onClickDeleteUser
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


// <button class="chat-modal__field" type="button">
//         <div class="chat-modal__icon">
//           {{{PlusIcon}}}
//         </div>
//         <p class="chat-modal__text">Добавить пользователя</p>
//       </button>
//       <button class="chat-modal__field" type="button">
//         <div class="chat-modal__icon_rotate">
//           {{{DelIcon}}}
//         </div>
//         <p class="chat-modal__text">Удалить пользователя</p>
//       </button>
