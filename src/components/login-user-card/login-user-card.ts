import Block from "../../core/block";
import { PlusIcon } from "../icons";

export type TSelectedUsers = {
  id: number;
  login: string;
}

interface ILoginUserCard extends TSelectedUsers {
  onClick: () => void;
};

export default class LoginUserCard extends Block {
  constructor(props: ILoginUserCard) {
    super("li", {
      ...props,
      className: "login-user-card",
      events: {
        click: props.onClick,
      },
      PlusIcon: new PlusIcon({
        color: "#3369F3",
        width: "12",
        height: "12"
      })
    })
  }

  public render(): string {
    return `
      <p class="login-user-card__login">{{login}}</p>
      <div class="login-user-card__icon">
         {{{PlusIcon}}}
      </div>
    `
  }
}
