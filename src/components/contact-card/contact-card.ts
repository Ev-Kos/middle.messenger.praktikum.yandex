import Block from "../../core/block";

type TContactCardProps = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string,
    },
    time: string,
    content: string,
  }
}

export default class ContactCard extends Block {
  constructor(props: TContactCardProps) {
    super('li', {
      ...props,
      className: 'contact-card',
    })
  }

  public render(): string {
    return `
      <div class="contact-card__message-and-photo-wrap">
        {{#if avatar}}
          <img class="contact-card__photo" src={{avatar}} alt="Фотография пользователя"/>
        {{else}}
          <div class="mock-photo"></div>
        {{/if}}
        <div class="contact-card__message-wrap">
          <p class="contact-card__chat-name">{{title}}</p>
          <p class="contact-card__message">{{last_message.content}}</p>
        </div>
      </div>
      <div class="contact-card__time-and-count">
        <p class="contact-card__time">{{getDate last_message.time false false}}</p>
        <div class="contact-card__count">
          <span class="contact-card__count-num">{{unread_count}}</span>
        </div>
      </div>
    `
  }
}
