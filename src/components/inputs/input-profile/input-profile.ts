import Block from "../../../core/block";

type TInputProfileProps = {
  type: string;
  placeholderText: string;
  name: string;
  value?: string;
  onChange?: (e: Event) => void;
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
    console.log(this.props)
    return `
      <input class="input-profile" type={{type}} placeholder={{placeholderText}} name={{ name }} value={{value}} />
    `
  }
}
