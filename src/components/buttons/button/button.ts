import Block from "../../../core/block";

type TButtonProps = {
  modifier?: string;
  type: string;
  text: string;
  modifierText?: string;
  onClick?: (e: Event) => void;
};

export default class Button extends Block {
  constructor(props: TButtonProps) {
    super('button', {
      ...props,
      className: "button",
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick,
      },
    })
  }

  public render(): string {
    return `
      <span class="button__text {{modifierText}}">{{text}}</span>
    `
  }
}
