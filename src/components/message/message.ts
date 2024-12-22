import Block from "../../core/block";
import { TMessages, TUser } from "../../utils/types";
import { CheckmarkIcon } from "../icons";

interface IMessageProps extends TMessages {
  isSend?: boolean;
  isText?: boolean;
  user?: TUser;
}

export default class Message extends Block {
  constructor(props: IMessageProps) {
    super("li", {
      ...props,
      CheckmarkIcon: new CheckmarkIcon
    });
  }

  public render(): string {
    return `
    <div class="{{#if isSend}}message-wrap-send{{else}}message-wrap{{/if}}">
      <div class="{{#if isSend}}message message_send{{else}}message{{/if}}">
        {{#unless isSend}}
          <div class="message__user-info">
            {{#if user.avatar}}
              <img class="message__avatar" src={{getImage user.avatar}} alt="Аватар" >
              {{else}}
              <div class="message__mock-avatar"></div>
            {{/if}}
            <p class="message__user-name">{{#if user.display_name}}{{user.display_name}}
              {{else}}{{user.first_name}} {{user.last_name}}{{/if}}
            </p>
          </div>
        {{/unless}}
        {{#if isText}}
          <div class="message__text">{{content}}
            <div class="message__time-wrap">
              <span class="message__time">{{getDate time false true}}</span>
              {{{CheckmarkIcon}}}
            </div>
          </div>
          {{else}}
            <div class="image-message">
              <img class="image-message__image" src={{getImage file.path}} alt={{file.filename}} />
              <div class="image-message__time-wrap">
                <p class="image-message__time">{{getDate time false true}}</p>
              </div>
            </div>
        {{/if}}
      </div>
    </div>
    `
  }
}
