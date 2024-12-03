import { Button, InputForm, Link } from "../../components";
import Block from "../../core/block";
import { checkLogin, checkPassword } from "../../utils/validate-inputs";

export default class LoginPage extends Block {
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
          console.log(this.props.formState)}
      }),
      Link: new Link({
        to: "#",
        modifierLink: "link",
        text: "Нет аккаунта?"
      })
    });
  }
  public render(): string {
    return `
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
