import Block from "../../../core/block";
import { ArrowIcon } from "../../icons";

type TButtonArrowProps = {
  onClick: (e: Event) => void;
  isRight: boolean;
}

export  default class ButtonArrow extends Block {
  constructor(props: TButtonArrowProps) {
    super("button", {
      ...props,
      className: props.isRight ? "button-arrow button-arrow_right" : "button-arrow",
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick
      },
      ArrowIcon: new ArrowIcon
    });
  }
  public render(): string {
    return `
      {{{ArrowIcon}}}
    `
  }
}
