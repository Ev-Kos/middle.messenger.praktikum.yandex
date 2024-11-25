import Block from "../../../core/block";
import { PaperClipIcon } from "../../icons";

type TButtonFile = {
  onClick: () => void;
}

export default class ButtonFile extends Block {
  constructor(props: TButtonFile) {
    super('button', {
      ...props,
      className: 'button-file',
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick
      },
      PaperClipIcon: new PaperClipIcon
    })
  }

  public render(): string {
    return `
      {{{PaperClipIcon}}}
    `
  }
}
