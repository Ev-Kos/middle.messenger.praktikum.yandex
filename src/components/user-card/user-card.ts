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
      <div class="{{#if isYou}}user-search-card__wrap-you{{else}}user-search-card__wrap{{/if}}">
        <div class="user-search-card__container">
          <div class="user-search-card__name-wrap">
            {{#if avatar}}
              <img src="{{getImage avatar}}" class="user-search-card__avatar" alt="Аватар пользователя" />
            {{else}}
              <div class="user-search-card__mock-photo"></div>
            {{/if}}
            <p class="user-search-card__name">{{#unless isYou}}{{first_name}} {{second_name}}{{else}}Вы{{/unless}}</p>
          </div>
            {{#unless isYou}}
              <p class="user-search-card__login">Логин: {{login}}</p>
            {{/unless}}
            {{#if isYou}}
              <p class="user-search-card__admin">Администратор чата</p>
            {{/if}}
        </div>
        {{#if isDeleted}}
          {{#unless isYou}}
            <div class="user-search-card__icon">
              {{{PlusIcon}}}
            </div>
          {{/unless}}
        {{/if}}
      </div>
    `
  }
}
