import Block from "../../../core/block";

type TInputProfileProps = {
  type: string;
  name: string;
  value?: string;
  onChange?: (e: Event) => void;
  error?: string;
  isError?: boolean;
}

export default class InputProfile extends Block {
  constructor(props: TInputProfileProps) {
    super("label", {
      ...props,
      className: "input-profile__label",
      events: {
        change: props.onChange,
      }
    });
  }

  public render(): string {
    return `
      <input class="input-profile" autocomplete={{ autocomplete }} type={{type}} placeholder="" name={{ name }} value={{ value }} >
    `
  }
}
