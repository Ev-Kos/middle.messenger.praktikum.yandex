import { InputForm } from "../../components";
import Block from "../../core/block";
import { checkLogin, checkPassword } from "../../utils/validate-inputs";

export default class LoginPage extends Block {
  constructor() {
    super("section", {
      formState: {
        login: "",
        password: "",
      },
      className: "page",
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
        }
      }),
      InputPassword: new InputForm({
        name: "password",
        type: "text",
        text: "Пароль",
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            console.log(value);
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
      // SignInButton: new Button({ label: "Sign in", color: "primary" }),
      // SignUpButton: new Button({
      //   label: "Sign up",
      //   color: "link",
      //   onClick: () => console.log(this.props.formState),
      // }),
    });
  }
  public render(): string {
    return `
  {{#> FormWrapper}}
    {{#> InfoFormWrapper }}
      {{#> Title text="Вход"}} {{/ Title}}
      {{#> InputsFormWrapper}}
        {{{InputLogin}}}
        {{{InputPassword}}}
      {{/ InputsFormWrapper}}
    {{/ InfoFormWrapper}}
    {{#> ButtonsFormWrapper}}
      {{#> Button text="Авторизоваться"}} {{/ Button}}
      {{#> Link filling="Нет аккаунта?" to="#"}} {{/ Link}}
    {{/ ButtonsFormWrapper}}
  {{/ FormWrapper}}
    `;
  }
}
