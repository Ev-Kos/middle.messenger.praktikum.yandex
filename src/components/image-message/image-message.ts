import Block from "../../core/block";

type TImageMessage = {
  src: string;
  alt: string;
  time: string;
}

export default class ImageMessage extends Block {
  constructor(props: TImageMessage) {
    super("div", {
      ...props,
      className: "image-message"
    });
  }

  public render(): string {
    return `
      <img class="image-message__image" src={{src}} alt={{alt}} />
      <div class="image-message__time-wrap">
        <p class="image-message__time">{{time}}</p>
      </div>
    `
  }
}
