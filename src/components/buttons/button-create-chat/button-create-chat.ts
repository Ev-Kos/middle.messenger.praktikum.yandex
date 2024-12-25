import Block from "../../../core/block";
import { PlusIcon } from "../../icons";

type TButtonCreateChat = {
  onClick: () => void;
}

export default class ButtonCreateChat extends Block {
  constructor(props: TButtonCreateChat) {
    super("button", {
      ...props,
      className: "button-chat",
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick
      },
      PlusIcon: new PlusIcon ({
        color: "#fff",
        width: "15",
        height: "15"
      })
    });
  }
  public render(): string {
    return `
      {{{PlusIcon}}}
    `
  }
}
