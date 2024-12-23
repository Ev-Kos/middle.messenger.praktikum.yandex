import Block from "../../../core/block";

type InputFormProps = {
  modifier?: string;
  name: string;
  type: string;
  value?: string;
  text: string;
  error?: string;
  isError?: boolean;
  withError?: boolean;
  id?: string;
  onChange?: (e: Event) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
};

export default class InputForm extends Block {
  constructor(props: InputFormProps) {
    super("label", {
      ...props,
      className: "input__label",
      events: {
        change: props.onChange,
        keydown: props.onKeyDown
      },

    })
  }
  public render(): string {
    return `
      <span class="input__text">{{ text }}</span>
      <input class="input {{modifier}}"
        autocomplete={{autocomplete}}
        placeholder=""
        name={{ name }}
        type={{ type }}
        value={{ value }}
      >
      {{#if withError}}
        <span class="input__error">{{#if isError}}{{error}}{{/if}}</span>
      {{/if}}
    `;
  }
}
