import Block from "../../../core/block";
import { ImageIcon } from "../../icons";

type TButtonAvatarProps = {
  onClick: () => void;
}

export default class ButtonAvatar extends Block {
  constructor(props: TButtonAvatarProps) {
    super("button", {
      className: "button-avatar",
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick
      },
      ImageIcon: new ImageIcon({
        width: "40",
        height: "40",
        color: "#CDCDCD"
      }),
    });
  }

  public render(): string {
    return `
      <div class="button-avatar__mask">
        <p class="button-avatar__text">Поменять аватар</p>
      </div>
      {{{ImageIcon}}}
    `
  }
}
