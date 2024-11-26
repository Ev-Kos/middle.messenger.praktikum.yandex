import Block from "../../core/block";
import { checkEmail } from "../../utils/validate-inputs";
import { ButtonAvatar } from "../buttons/button-avatar";
import { ProfileField } from "../profile-field";

type TProfileInfoProps = {
  onClickButtonAvatar: () => void;
}

export default class ProfileInfo extends Block {
  constructor(props: TProfileInfoProps) {
    super("div", {
      className: "profile-info",
      isNotChange: true,
      userName: "Иван",
      formState: {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        password: "",
      },
      ButtonAvatar: new ButtonAvatar({
        onClick: props.onClickButtonAvatar
      }),
      EmailField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Почта",
        inputName: "email",
        inputValue:"pochta@yandex.ru",
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.EmailField, checkEmail(value));
            this.setProps({
              formState: {
                ...this.props.formState,
                email: value,
              },
            });
          }
        },
        inputPlaceholder: "",
        inputType: "text"
      }),
      ChangeField: new ProfileField({
        isButton: true,
        isWithInput: false,
        buttonText: "Изменить данные",
        modifierButton: "profile-info__button",
        onClick: () => {
          this.setPropsForChildren(this.children.EmailField, {isDisabled: false, inputIsDisabled: false})
          this.setProps({isNotChange: false})
        },
      })
    });
  }

  public render(): string {
    return `
      <div class="profile-info__avatar-wrap">
        {{{ButtonAvatar}}}
        {{#if isNotChange }}
          <h1 class="profile-info__user-name">{{userName}}</h1>
        {{/if}}
      </div>
      {{#unless isChangePassword }}
        <ul class="profile-info__fields">
          {{{EmailField}}}
        </ul>
      {{/unless}}
      {{#if isNotChange }}
        <ul class="profile-info__fields">
          {{{ChangeField}}}

        </ul>
      {{/if}}
    `
  }
}

//           {{> ProfileField text="Логин" name="login" value="ivanivanov" isDisabled=isNotChange isWithInput="true" type="text"}}
//           {{> ProfileField text="Имя" name="first_name" value="Иван" isDisabled=isNotChange isWithInput="true" type="text"}}
//           {{> ProfileField text="Фамилия" name="second_name" value="Иванов" isDisabled=isNotChange isWithInput="true" type="text"}}
//           {{> ProfileField text="Имя в чате" name="display_name" value="Иван" isDisabled=isNotChange isWithInput="true" type="text"}}
//           {{> ProfileField text="Телефон" name="phone" value="+7-909-967-30-30" isDisabled=isNotChange isWithInput="true" type="text"}}


      // {{#if isNotChange }}
      //   <ul class="profile-info__fields">
      //     {{> ProfileField to="#" modifier-link="profile-info__link" filling="Изменить пароль" isLink="true"}}
      //     {{> ProfileField to="#" modifier-link="profile-info__link-exit" filling="Выйти" isLink="true"}}
      //   </ul>
      // {{/if}}
//       {{#if isChangePassword}}
//         <ul class="profile-info__fields">
//           {{> ProfileField text="Старый пароль" name="oldPassword" value="11111111" isWithInput="true" type="password"}}
//           {{> ProfileField text="Новый пароль" name="newPassword" value="11111" isWithInput="true" type="password"}}
//           {{> ProfileField text="Повторите новый пароль" name="repeat-password" value="11111" isWithInput="true" type="password"}}
//         </ul>
//       {{/if}}
//       {{#unless isNotChange}}
//         {{> Button modifier="profile-info__save-button" text="Сохранить"}}
//       {{/unless}}
