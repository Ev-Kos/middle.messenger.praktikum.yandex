import Block from "../../../core/block";

type TInputCreateMessageProps = {
  onChange: (e: InputEvent) => void;
  placeholderText: string;
  name: string;
  value?: string;
  type: string;
  onKeyDown?: (e: KeyboardEvent) => void;
}

export default class InputCreateMessage extends Block {
  constructor(props: TInputCreateMessageProps) {
    super("label", {
      ...props,
      className: "input-create-message__label",
      events: {
        change: props.onChange,
        keydown: props.onKeyDown
      }
    })
  }

  public render(): string {
    return `
      <input class="{{#if isError}} input-create-message_error {{/if}} input-create-message"
        placeholder="{{placeholderText}}"
        name="{{ name }}"
        type="{{ type }}"
        value="{{ value }}"
      >
    `
  }
}
