import Block from "../../core/block";

type TProfileFieldProps = {
  isButton: boolean;
  buttonText?: string;
  modifierButton?: string;
  nameField?: string;
  modifierNameField?: string;
  isWithInput: boolean;
  inputName?: string;
  value?: string;
  inputIsDisabled?: boolean;
  onChangeInput?: (e: Event) => void;
  inputType?: string;
  onClick?: () => void;
  error?: string;
}

export default class ProfileField extends Block {
  constructor(props: TProfileFieldProps) {
    super("li", {
      ...props,
      className: "profile-field",
      events: {
        click: props.onClick,
        change: props.onChangeInput
      },
    });
  }

  public render(): string {
    return `
      <div class="profile-field__info-wrap">
        {{#if isButton}}
          <button class="profile-field__button {{modifierButton}}" type="button">{{buttonText}}</button>
        {{else}}
          <p class="{{modifierNameField}} {{#unless modifierNameField}}profile-field__text{{/unless}}">{{nameField}}</p>
        {{/if}}
        {{#if isWithInput}}
          {{#if inputIsDisabled}}
            <p class="profile-field__value">{{value}}</p>
          {{else}}
            <label class="profile-field__label">
              <input class="profile-field__input-profile" type={{type}} name={{name}} value={{value}} >
            </label>
          {{/if}}
        {{/if}}
      </div>
      {{#unless inputIsDisabled}}
        <span class="profile-field__error">{{error}}</span>
      {{/unless}}
    `
  }
}
