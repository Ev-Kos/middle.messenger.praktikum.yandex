import Block from "../../core/block";
import { logout } from "../../services/auth";
import { checkEmail, checkLogin, checkName, checkPassword, checkPhone, checkRepeatedPassword } from "../../utils/validate-inputs";
import { Button } from "../buttons/button";
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
      mainFieldState: {
        email: "pochta@yandex.ru",
        login: "ivanivanov",
        first_name: "Иван",
        second_name: "Иванов",
        phone: "+79099673030",
        display_name: "Иван",
      },
      passwordState: {
        oldPassword: "",
        newPassword: "",
      },
      repeatedPassword: "",
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
              mainFieldState: {
                ...this.props.mainFieldState,
                email: value,
              },
            });
          }
        },
        inputType: "text"
      }),
      LoginField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Логин",
        inputName: "login",
        inputValue:"ivanivanov",
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.LoginField, checkLogin(value));
            this.setProps({
              mainFieldState: {
                ...this.props.mainFieldState,
                login: value,
              },
            });
          }
        },
        inputType: "text"
      }),
      FirstNameField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Имя",
        inputName: "first_name",
        inputValue:"Иван",
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.FirstNameField, checkName(value, "Имя должно"));
            this.setProps({
              mainFieldState: {
                ...this.props.mainFieldState,
                first_name: value,
              },
            });
          }
        },
        inputType: "text"
      }),
      LastNameField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Фамилия",
        inputName: "second_name",
        inputValue:"Иванов",
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.LastNameField, checkName(value, "Фамилия должна"));
            this.setProps({
              mainFieldState: {
                ...this.props.mainFieldState,
                second_name: value,
              },
            });
          }
        },
        inputType: "text"
      }),
      DisplayNameField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Имя в чате",
        inputName: "display_name",
        inputValue: "Иван",
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.DisplayNameField, checkName(value, "Имя должно"));
            this.setProps({
              mainFieldState: {
                ...this.props.mainFieldState,
                display_name: value,
              },
            });
          }
        },
        inputType: "text"
      }),
      PhoneField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Телефон",
        inputName: "phone",
        inputValue:"+79099673030",
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.PhoneField, checkPhone(value));
            this.setProps({
              mainFieldState: {
                ...this.props.mainFieldState,
                phone: value,
              },
            });
          }
        },
        inputType: "text"
      }),
      ChangeField: new ProfileField({
        isButton: true,
        isWithInput: false,
        buttonText: "Изменить данные",
        modifierButton: "profile-info__button",
        onClick: () => {
          this.setPropsForChildren(this.children.EmailField, {inputIsDisabled: false})
          this.setPropsForChildren(this.children.LoginField, {inputIsDisabled: false})
          this.setPropsForChildren(this.children.FirstNameField, {inputIsDisabled: false})
          this.setPropsForChildren(this.children.LastNameField, {inputIsDisabled: false})
          this.setPropsForChildren(this.children.DisplayNameField, {inputIsDisabled: false})
          this.setPropsForChildren(this.children.PhoneField, {inputIsDisabled: false});
          this.setProps({isNotChange: false})
        },
      }),
      ChangePasswordField: new ProfileField({
        isButton: true,
        isWithInput: false,
        buttonText: "Изменить пароль",
        modifierButton: "profile-info__button",
        onClick: () => {
          this.setPropsForChildren(this.children.OldPasswordField, {inputIsDisabled: false})
          this.setPropsForChildren(this.children.NewPasswordField, {inputIsDisabled: false})
          this.setPropsForChildren(this.children.ReteatNewPasswordField, {inputIsDisabled: false})
          this.setProps({isNotChange: false, isChangePassword: true})
        },
      }),
      ExitField: new ProfileField({
        isButton: true,
        isWithInput: false,
        buttonText: "Выйти",
        modifierButton: "profile-info__button-exit",
        onClick: () => { logout() }
      }),
      OldPasswordField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Старый пароль",
        inputName: "oldPassword",
        inputValue:"",
        inputIsDisabled: true,
        modifierNameField: "password-field",
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.OldPasswordField, checkPassword(value));
            this.setProps({
              passwordState: {
                ...this.props.passwordState,
                oldPassword: value,
              },
            });
          }
        },
        inputType: "password"
      }),
      NewPasswordField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Новый пароль",
        inputName: "newPassword",
        inputValue:"",
        inputIsDisabled: true,
        modifierNameField: "password-field",
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.NewPasswordField, checkPassword(value));
            this.setProps({
              passwordState: {
                ...this.props.passwordState,
                newPassword: value,
              },
            });
          }
        },
        inputType: "password"
      }),
      ReteatNewPasswordField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Повторите новый пароль",
        inputName: "repeat_password",
        inputValue:"",
        inputIsDisabled: true,
        modifierNameField: "password-field",
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.ReteatNewPasswordField, checkRepeatedPassword(this.props.passwordState.newPassword, value));
            this.setProps({
              repeatedPassword: value
            });
          }
        },
        inputType: "password"
      }),
      ButtonMainFields: new Button({
        type: "submit",
        text: "Сохранить",
        modifierButton:"profile-info__save-button",
        onClick: (e) => {
          e.preventDefault();

          const errorEmail = checkEmail(this.props.mainFieldState.email)
          const errorLogin = checkLogin(this.props.mainFieldState.login);
          const errorName = checkName(this.props.mainFieldState.first_name, "Имя должно")
          const errorLastName = checkName(this.props.mainFieldState.second_name, "Фамилия должна")
          const errorPhone = checkPhone(this.props.mainFieldState.phone)
          const errorDisplayName = checkName(this.props.mainFieldState.display_name, "Имя должно");

          const error = errorEmail.isError || errorLogin.isError || errorName.isError
            || errorLastName.isError || errorPhone.isError || errorDisplayName.isError

          if (error) {
            console.log(error)
            this.setPropsForChildren(this.children.EmailField, errorEmail)
            this.setPropsForChildren(this.children.LoginField, errorLogin)
            this.setPropsForChildren(this.children.FirstNameField, errorName)
            this.setPropsForChildren(this.children.LastNameField, errorLastName)
            this.setPropsForChildren(this.children.DisplayNameField, errorDisplayName)
            this.setPropsForChildren(this.children.PhoneField, errorPhone);

            return;
          }
          console.log(this.props.mainFieldState)
        }
      }),
      ButtonPassword: new Button({
        type: "submit",
        text: "Сохранить",
        modifierButton:"profile-info__save-button",
        onClick: (e) => {
          e.preventDefault();

          const errorPassword = checkPassword(this.props.passwordState.oldPassword);
          const errorRepeatedPassword = checkRepeatedPassword(this.props.passwordState.newPassword, this.props.repeatedPassword);

          if (errorPassword.isError || errorRepeatedPassword.isError) {
            this.setPropsForChildren(this.children.InputPassword, errorPassword);
            this.setPropsForChildren(this.children.InputRepeatedPassword, errorRepeatedPassword);
            return;
          }
          console.log(this.props.passwordState.newPassword)
        }
      }),
    });
  }

  public render(): string {
    return `
      <form class="profile-info__form">
        <div class="profile-info__avatar-wrap">
          {{{ButtonAvatar}}}
          {{#if isNotChange }}
            <h1 class="profile-info__user-name">{{userName}}</h1>
          {{/if}}
        </div>
        {{#unless isChangePassword }}
          <ul class="profile-info__fields">
            {{{EmailField}}}
            {{{LoginField}}}
            {{{FirstNameField}}}
            {{{LastNameField}}}
            {{{DisplayNameField}}}
            {{{PhoneField}}}
          </ul>
        {{/unless}}
        {{#if isNotChange }}
          <ul class="profile-info__fields">
            {{{ChangeField}}}
            {{{ChangePasswordField}}}
            {{{ExitField}}}
          </ul>
        {{/if}}
        {{#if isChangePassword}}
          <ul class="profile-info__fields">
            {{{OldPasswordField}}}
            {{{NewPasswordField}}}
            {{{ReteatNewPasswordField}}}
          </ul>
        {{/if}}
        <div class="profile-info__button-wrap">
        {{#unless isNotChange}}
          {{#unless isChangePassword }}
            {{{ButtonMainFields}}}
          {{/unless}}
        {{/unless}}
        {{#if isChangePassword}}
          {{{ButtonPassword}}}
        {{/if}}
        </div>
      </form>
    `
  }
}
