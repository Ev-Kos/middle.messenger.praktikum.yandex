import { Button, InputForm } from "../../components";
import Block from "../../core/block";
import { singUp } from "../../services/auth";
import { connect } from "../../utils/connect";
import { ROUTES } from "../../utils/constants";
import { checkEmail, checkLogin, checkName, checkPassword, checkPhone, checkRepeatedPassword } from "../../utils/validate-inputs";

class RegistrationPage extends Block {
  constructor() {
    super('section', {
      formState: {
        email: "",
        login: "",
        first_name: "",
        second_name: "",
        phone: "",
        password: "",
      },
      repeatedPassword: "",
      className: 'registration-page',
      InputEmail: new InputForm({
        name: "email",
        type: "text",
        text: "Почта",
        withError: true,
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputEmail, checkEmail(value));
            this.setProps({
              formState: {
                ...this.props.formState,
                email: value,
              },
            });
          }
        },
      }),
      InputLogin: new InputForm({
        name: "login",
        type: "text",
        text: "Логин",
        withError: true,
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputLogin, checkLogin(value));
            this.setProps({
              formState: {
                ...this.props.formState,
                login: value,
              },
            });
          }
        },
      }),
      InputName: new InputForm({
        name: "first_name",
        type: "text",
        text: "Имя",
        withError: true,
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputName, checkName(value, "Имя должно"));
            this.setProps({
              formState: {
                ...this.props.formState,
                first_name: value,
              },
            });
          }
        },
      }),
      InputLastName: new InputForm({
        name: "second_name",
        type: "text",
        text: "Фамилия",
        withError: true,
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputLastName, checkName(value, "Фамилия должна"));
            this.setProps({
              formState: {
                ...this.props.formState,
                second_name: value,
              },
            });
          }
        },
      }),
      InputPhone: new InputForm({
        name: "phone",
        type: "text",
        text: "Телефон",
        withError: true,
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputPhone, checkPhone(value));
            this.setProps({
              formState: {
                ...this.props.formState,
                phone: value,
              },
            });
          }
        },
      }),
      InputPassword: new InputForm({
        name: "password",
        type: "password",
        text: "Пароль",
        withError: true,
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputPassword, checkPassword(value));
            this.setProps({
              formState: {
                ...this.props.formState,
                password: value,
              },
            });
          }
        }
      }),
      InputRepeatedPassword: new InputForm({
        name: "repeat-password",
        type: "password",
        text: "Пароль (еще раз)",
        withError: true,
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputRepeatedPassword, checkRepeatedPassword(this.props.formState.password, value));
            this.setProps({
              repeatedPassword: value
            });
          }
        }
      }),
      Button: new Button({
        type: "submit",
        text: "Зарегистрироваться",
        onClick: (e: MouseEvent) => {
          e.preventDefault();

          const errorEmail = checkEmail(this.props.formState.email)
          const errorLogin = checkLogin(this.props.formState.login);
          const errorName = checkName(this.props.formState.first_name, "Имя должно")
          const errorLastName = checkName(this.props.formState.second_name, "Фамилия должна")
          const errorPhone = checkPhone(this.props.formState.phone)
          const errorPassword = checkPassword(this.props.formState.password);
          const errorRepeatedPassword = checkRepeatedPassword(this.props.formState.password, this.props.repeatedPassword);

          const error = errorEmail.isError || errorLogin.isError || errorName.isError || errorLastName.isError || errorPhone.isError
            || errorPassword.isError || errorRepeatedPassword.isError

          if (error) {
            this.setPropsForChildren(this.children.InputEmail, errorEmail);
            this.setPropsForChildren(this.children.InputLogin, errorLogin);
            this.setPropsForChildren(this.children.InputName, errorName);
            this.setPropsForChildren(this.children.InputLastName, errorLastName);
            this.setPropsForChildren(this.children.InputPhone, errorPhone);
            this.setPropsForChildren(this.children.InputPassword, errorPassword);
            this.setPropsForChildren(this.children.InputRepeatedPassword, errorRepeatedPassword);
            return;
          }
          singUp(this.props.formState);
        }
      }),
      Link: new Button({
        type: "button",
        onClick: () => window.router.go(ROUTES.login),
        modifierButton: "button_link",
        modifierText: "button_link-text",
        text: "Войти?"
      })
    });
  }
  public render(): string {
    return `
      <p class="{{#if singUpError}}registration-page__error-visible {{else}}registration-page__error{{/if}}">Что-то пошло не так :(</p>
      <form class="registration-form">
        <div class="registration-form__info">
          <h1 class="registration-form__title">Регистрация</h1>
          <div class="registration-form__inputs">
            {{{InputEmail}}}
            {{{InputLogin}}}
            {{{InputName}}}
            {{{InputLastName}}}
            {{{InputPhone}}}
            {{{InputPassword}}}
            {{{InputRepeatedPassword}}}
          </div>
        </div>
        <div class="registration-form__buttons">
          {{{Button}}}
          {{{Link}}}
        </div>
      </form
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isLoading: state.isLoading,
    singUpError: state.singUpError,
  };
};

export default connect(mapStateToProps)(RegistrationPage);
