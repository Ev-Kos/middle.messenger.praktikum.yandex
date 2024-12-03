import Block from "../../core/block";
import { checkLogin } from "../../utils/validate-inputs";
import { Button } from "../buttons/button";
import { InputForm } from "../inputs/input-form";

type TAddDeleteUserSelectedModal = {
  isClickAdd?: boolean
}

export default class AddDeleteUserSelectedModal extends Block {
  constructor(props: TAddDeleteUserSelectedModal) {
    super("form", {
      ...props,
      className: "form-modal",
      login: "",
      Input: new InputForm({
        name: "login",
        type: "text",
        text: "Логин",
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.Input, checkLogin(value));
            this.setProps({
                login: value,
            });
          }
        },
      }),
      ButtonAdd: new Button({
        type: "submit",
        text: "Добавить",
        onClick: (e) => {
          e.preventDefault();
          const errorLogin = checkLogin(this.props.login);

          if (errorLogin.isError) {
            this.setPropsForChildren(this.children.Input, errorLogin);
            return;
          }
        }
      }),
      ButtonDelete: new Button({
        type: "submit",
        text: "Удалить",
        onClick: (e) => {
          e.preventDefault();
          const errorLogin = checkLogin(this.props.login);

          if (errorLogin.isError) {
            this.setPropsForChildren(this.children.Input, errorLogin);
            return;
          }
          console.log(this.props.login)
        }
      }),
    });
  }

  public render(): string {
    return `
      {{#if isClickAdd}}
        <h1 class="form-modal__title">Добавить пользователя</h1>
      {{else}}
        <h1 class="form-modal__title">Удалить пользователя</h1>
      {{/if}}
      <div class="form-modal__form">
        {{{Input}}}
        {{#if isClickAdd}}
          {{{ButtonAdd}}}
        {{else}}
          {{{ButtonDelete}}}
        {{/if}}
      </div>
    `
  }
}
