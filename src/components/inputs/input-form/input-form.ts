import Block from "../../../core/block";

type InputFormProps = {
  modifier?: string;
  name: string;
  type: string;
  value?: string;
  text: string;
  error?: string;
  isError?: boolean;
  onChange?: (e: Event) => void;
};

export default class InputForm extends Block {
  constructor(props: InputFormProps) {
    super("label", {
      ...props,
      className: "input__label",
      value: props.value ? props.value : "",
      events: {
        change: props.onChange
      },
    })
  }
  public render(): string {
    return `
      <input class="input {{modifier }}" autocomplete="new-password" placeholder="" name={{ name }} type={{ type }} value={{ value }} >
      <span class="input__text">{{ text }}</span>
      <span class="input__error">{{#if isError}}{{error}}{{/if}}</span>
    `;
  }
}
