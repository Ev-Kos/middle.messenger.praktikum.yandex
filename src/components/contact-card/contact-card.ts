import Block from "../../core/block";
import { TGetChatsResponse } from "../../utils/types";

export interface IGetChatsProps extends TGetChatsResponse {
  onClick: (id: number) => void,
  isActive?: boolean;
  unreadCount?: number;
}

export default class ContactCard extends Block {
  constructor(props: IGetChatsProps) {
    super('li', {
      ...props,
      className: 'contact',
      events: {
				click: props.onClick,
			},
    })
  }

  public render(): string {
    return `
      <div class="contact-card {{#if isActive}}contact-card_selected{{/if}}">
        <div class="contact-card__message-and-photo-wrap">
          {{#if avatar}}
            <img class="contact-card__photo" src="{{getImage avatar}}" alt="Фотография чата"/>
          {{else}}
            <div class="contact-card__mock-photo"></div>
          {{/if}}
          <div class="contact-card__message-wrap">
            <p class="contact-card__chat-name">{{title}}</p>
            {{#if last_message}}
            <p class="contact-card__message">
              {{#if isYou}}Вы: {{last_message.content}}
                {{else if last_message.user.display_name}}{{last_message.user.display_name}}: {{last_message.content}}
                {{else}}{{last_message.user.first_name}}: {{last_message.content}}
              {{/if}}
            </p>
            {{/if}}
          </div>
        </div>
        <div class="contact-card__time-and-count">
          <p class="
            {{#if last_message.content}}contact-card__time
              {{else}}contact-card__time contact-card__time_hidden
            {{/if}}">{{getDate last_message.time true false}}
          </p>
          {{#if unread_count}}
            <div class="contact-card__count">
              <span class="contact-card__count-num">{{unread_count}}</span>
            </div>
          {{/if}}
        </div>
      </div>
    `
  }
}
