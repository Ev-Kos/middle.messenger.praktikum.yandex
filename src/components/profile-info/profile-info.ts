
import Block, { TBlockProps } from "../../core/block";
import { logout } from "../../services/auth";
import { changePassword, changeProfile } from "../../services/users";
import { connect } from "../../utils/connect";
import { TUser } from "../../utils/types";
import { checkEmail, checkLogin, checkName, checkPassword, checkPhone, checkRepeatedPassword } from "../../utils/validate-inputs";
import { Button } from "../buttons/button";
import { ButtonAvatar } from "../buttons/button-avatar";
import fileLoadModal from "../modals/file-load-modal";
import { ProfileField } from "../profile-field";
import { ModalWrapper } from "../wrappers/modals-wrapper";

type TProfileInfoProps = {
  onClickButtonAvatar: () => void;
  user: TUser
}

class ProfileInfo extends Block {
  constructor(props: TProfileInfoProps) {
    super("div", {
      className: "profile-info",
      userName: props.user.first_name,
      isNotChange: window.store.state.isNotChange,
      mainFieldState: {
        email: props.user.email,
        login: props.user.login,
        first_name: props.user.first_name,
        second_name: props.user.second_name,
        phone: props.user.phone,
        display_name: props.user.display_name,
      },
      passwordState: {
        oldPassword: "",
        newPassword: "",
      },
      repeatedPassword: "",
      ButtonAvatar: new ButtonAvatar({
        onClick: () => {
          window.store.set({isClickFileLoad: true})
        },
        text: "Поменять аватар",
        isCreateChat: false
      }),
      EmailField: new ProfileField({
        isButton: false,
        isWithInput: true,
        nameField: "Почта",
        inputName: "email",
        value: props.user.email,
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            console.log(value)
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
        value: props.user.login,
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
        value: props.user.first_name,
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
        value: props.user.second_name,
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
        value: props.user.display_name ? props.user.display_name : "",
        inputIsDisabled: true,
        onChangeInput: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.DisplayNameField, {value: value});
            this.setProps({
              mainFieldState: {
                ...this.props.mainFieldState,
                display_name: value === "" ? null : value,
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
        value: props.user.phone,
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
          window.store.set({isNotChange: false})
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
          window.store.set({isNotChange: false, isChangePassword: true})
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
        value:"",
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
        value:"",
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
        value:"",
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
      ButtonMainFieldsSave: new Button({
        type: "submit",
        text: "Сохранить",
        modifierButton:"profile-info__save-button",
        onClick: (e: Event) => {
          e.preventDefault();

          const errorEmail = checkEmail(this.props.mainFieldState.email)
          const errorLogin = checkLogin(this.props.mainFieldState.login);
          const errorName = checkName(this.props.mainFieldState.first_name, "Имя должно")
          const errorLastName = checkName(this.props.mainFieldState.second_name, "Фамилия должна")
          const errorPhone = checkPhone(this.props.mainFieldState.phone)

          const error = errorEmail.isError || errorLogin.isError || errorName.isError
            || errorLastName.isError || errorPhone.isError

          if(!error) {
            let obj:{[key: string]: any} = {}
            for(let key in this.props.mainFieldState) {
              //@ts-ignore
              if(this.props.mainFieldState[key] !== props.user[key])
               obj[key] = this.props.mainFieldState[key]
            }
            if(Object.keys(obj).length !== 0) {
              changeProfile(obj)
            }
          }
        }
      }),
      ButtonPassword: new Button({
        type: "submit",
        text: "Сохранить",
        modifierButton:"profile-info__save-button",
        onClick: (e: Event) => {
          e.preventDefault();

          const errorPassword = checkPassword(this.props.passwordState.oldPassword);
          const errorRepeatedPassword = checkRepeatedPassword(this.props.passwordState.newPassword, this.props.repeatedPassword);

          if (errorPassword.isError || errorRepeatedPassword.isError) {
            this.setPropsForChildren(this.children.InputPassword, errorPassword);
            this.setPropsForChildren(this.children.InputRepeatedPassword, errorRepeatedPassword);
            return;
          }
          changePassword(this.props.passwordState)
        }
      }),
      FileLoadModal: new fileLoadModal({}),
      ModalWrapper: new ModalWrapper({
        onClick: () => {
          window.store.set({isClickFileLoad: false})
        }
      }),
    });
  }

  public render(): string {
    const isNotChange = window.store.state.isNotChange

    if(isNotChange) {
      this.setPropsForChildren(this.children.EmailField, {inputIsDisabled: true, value: window.store.state.user?.email})
      this.setPropsForChildren(this.children.LoginField, {inputIsDisabled: true, value: window.store.state.user?.login})
      this.setPropsForChildren(this.children.FirstNameField, {inputIsDisabled: true, value: window.store.state.user?.first_name})
      this.setPropsForChildren(this.children.LastNameField, {inputIsDisabled: true, value: window.store.state.user?.second_name})
      this.setPropsForChildren(this.children.DisplayNameField, {inputIsDisabled: true, value: window.store.state.user?.display_name})
      this.setPropsForChildren(this.children.PhoneField, {inputIsDisabled: true, value: window.store.state.user?.phone});
      this.setPropsForChildren(this.children.OldPasswordField, {value: "", isError: false, error: ""});
      this.setPropsForChildren(this.children.NewPasswordField, {value: "", isError: false,  error: ""});
      this.setPropsForChildren(this.children.ReteatNewPasswordField, {value: "", isError: false,  error: ""});
    }

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
            {{{ButtonMainFieldsSave}}}
          {{/unless}}
        {{/unless}}
        {{#if isChangePassword}}
          {{{ButtonPassword}}}
        {{/if}}
        </div>
      </form>
      {{#if isClickFileLoad}}
        {{{ModalWrapper}}}
        {{{FileLoadModal}}}
      {{/if}}
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    user: state.user,
    isClickFileLoad: state.isClickFileLoad,
    isNotChange: state.isNotChange,
    isChangePassword: state.isChangePassword
  };
};

export default connect(mapStateToProps)(ProfileInfo as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
