import Block from "../../core/block";
import { TUser } from "../../utils/types";
import { PlusIcon } from "../icons";

interface IUserSearchCardProps extends TUser {
  onClick: () => void,
  isDeleted: boolean
}

export default class UserCard extends Block {
  constructor(props: IUserSearchCardProps) {
    super('li', {
      ...props,
      className: 'user-search-card',
      events: {
				click: props.onClick,
			},
      PlusIcon: new PlusIcon({
        color: "#3369F3",
        width: "12",
        height: "12"
      })
    });
  }

  public render(): string {
    return `
      <div class="user-search-card__container">
        <div class="user-search-card__name-wrap">
          {{#if avatar}}
            <img src="{{getImage avatar}}" class="user-search-card__avatar" alt="Аватар пользователя" />
          {{else}}
            <div class="user-search-card__mock-photo"></div>
          {{/if}}
          <p class="user-search-card__name">{{first_name}} {{second_name}}</p>
        </div>
        <p class="user-search-card__login">Логин: {{login}}</p>
      </div>
      {{#if isDeleted}}
        <div class="user-search-card__icon">
          {{{PlusIcon}}}
        </div>
      {{/if}}
    `
  }
}
