import Block from "../../core/block";
import { InputProfile } from "../inputs/input-profile";

type TProfileFieldProps = {
  isButton: boolean;
  buttonText?: string;
  modifierButton?: string;
  nameField?: string;
  modifierNameField?: string;
  isWithInput: boolean;
  inputName?: string;
  inputValue?: string;
  inputIsDisabled?: boolean;
  onChangeInput?: (e: Event) => void;
  inputPlaceholder?: string;
  inputType?: string;
  onClick?: () => void;
}

export default class ProfileField extends Block {
  constructor(props: TProfileFieldProps) {
    super("li", {
      ...props,
      className: "profile-field",
      events: {
        click: props.onClick
      },
      InputProfile: new InputProfile({
        name: String(props.inputName),
        value: props.inputValue,
        placeholderText: String(props.inputPlaceholder),
        type: String(props.inputType),
        onChange: props.onChangeInput,
      })
    });
  }

  public render(): string {
    return `
      {{#if isButton}}
        <button class="profile-field__button {{modifierButton}}" type="button">{{buttonText}}</button>
      {{else}}
        <p class="profile-field__text {{modifierNameField}}">{{nameField}}</p>
      {{/if}}
      {{#if isWithInput}}
        {{#if inputIsDisabled}}
          <p class="profile-field__value">{{inputValue}}</p>
        {{else}}
          {{{InputProfile}}}
        {{/if}}
      {{/if}}
    `
  }
}
