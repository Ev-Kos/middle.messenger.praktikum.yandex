import Block from "../../core/block";
import { TUser } from "../../utils/types";

interface IUserSearchCardProps extends TUser {
  onClick: () => void,
}

export default class UserSearchCard extends Block {
  constructor(props: IUserSearchCardProps) {
    super('li', {
      ...props,
      className: 'user-search-card',
      events: {
				click: props.onClick,
			},
    });
  }

  public render(): string {
    return `
      <div class="user-search-card__name-wrap">
        {{#if avatar}}
          <img src="{{getImage avatar}}" class="user-search-card__avatar" alt="Аватар пользователя" />
        {{else}}
          <div class="user-search-card__mock-photo"></div>
        {{/if}}
        <p class="user-search-card__name">{{first_name}} {{second_name}}</p>
      </div>
      <p class="user-search-card__login">Логин: {{login}}</p>
    `
  }
}
