import Block from "../../core/block";
import { CheckmarkIcon } from "../icons";

type TMessage = {
  text: string;
  time: string;
  isSend: boolean;
}

export default class Message extends Block {
  constructor(props: TMessage) {
    super("div", {
      ...props,
      className: props.isSend ? "message message_send" : "message",
      CheckmarkIcon: new CheckmarkIcon
    });
  }

  public render(): string {
    return `
      <div class="message__text">{{text}}
        <div class="message__time-wrap">
          <span class="message__time">{{time}}</span>
          {{{CheckmarkIcon}}}
        </div>
      </div>
    `
  }
}
