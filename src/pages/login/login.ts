import { Button, InputForm } from "../../components";
import Block from "../../core/block";
import { ROUTES } from "../../utils/constants";
import { checkLogin, checkPassword } from "../../utils/validate-inputs";
import { singIn } from "../../services/auth";
import { connect } from "../../utils/connect";

class LoginPage extends Block {
  constructor() {
    super("section", {
      formState: {
        login: "",
        password: "",
      },
      className: "login-page",
      InputLogin: new InputForm({
        name: "login",
        type: "text",
        text: "Логин",
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
      InputPassword: new InputForm({
        name: "password",
        type: "password",
        text: "Пароль",
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
      Button: new Button({
        type: "submit",
        text: "Авторизоваться",
        onClick: (e) => {
          e.preventDefault();

          const errorLogin = checkLogin(this.props.formState.login);
          const errorPassword = checkPassword(this.props.formState.password);

          if (errorLogin.isError || errorPassword.isError) {
            this.setPropsForChildren(this.children.InputLogin, errorLogin);
            this.setPropsForChildren(this.children.InputPassword, errorPassword);
            return;
          }
          singIn(this.props.formState);
        }
      }),
      Link: new Button({
        type: "button",
        onClick: () => window.router.go(ROUTES.register),
        modifierButton: "button_link",
        modifierText: "button_link-text",
        text: "Нет аккаунта?"
      })
    });
  }
  public render(): string {
    return `
      <p class="{{#if singInError}}login-page__error-visible {{else}}login-page__error{{/if}}">Не верный логин или пароль</p>
      <form class="form-login">
        <div class="form-login__info">
          <h1 class="form-login__title">Вход</h1>
          <div class="form-login__inputs">
            {{{InputLogin}}}
            {{{InputPassword}}}
          </div>
        </div>
        <div class="form-login__buttons">
          {{{Button}}}
          {{{Link}}}
        </div>
      </form
    `;
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isLoading: state.isLoading,
    singInError: state.singInError,
  };
};

export default connect(mapStateToProps)(LoginPage);
