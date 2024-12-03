import Block from "../../../core/block";

type TModalWrapperProps = {
  onClick: () => void;
}

export default class ModalWrapper extends Block {
  constructor(props: TModalWrapperProps) {
    super("div", {
      ...props,
      className: "modal-wrapper",
      events: {
        click: props.onClick
      }
    });
  }

  public render(): string {
    return ``;

  }
}
