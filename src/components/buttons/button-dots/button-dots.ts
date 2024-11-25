import Block from "../../../core/block";

type TButtonDots = {
  onClick: () => void;
}

export default class ButtonDots extends Block {
  constructor(props: TButtonDots) {
    super("button", {
      className: "button-dots",
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick
      }
    });
  }

  public render(): string {
    return `
      <div class="button-dots__dot"></div>
      <div class="button-dots__dot"></div>
      <div class="button-dots__dot"></div>
    `
  }
}
