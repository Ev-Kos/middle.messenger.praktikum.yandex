import Block from "../../core/block";
import { Button } from "../buttons/button";
import { InputFile } from "../inputs/input-file";

export default class FileLoadModal extends Block {
  constructor() {
    super("form", {
      className: "form-modal",
      InputFile: new InputFile({
        onChange: (e) => {
          console.log(e)
        }
      }),
      Button: new Button({
        type: "submit",
        text: "Поменять",
        onClick: (e) => {
          e.preventDefault();
          console.log("click")}
      }),
    });
  }

  public render(): string {
    return `
      {{#if isError}}
        <h1 class="form-modal__title-error">Ошибка, попробуйте ещё раз</h1>
      {{else}}
        <h1 class="form-modal__title">Загрузите файл</h1>
      {{/if}}
      <div class="form-modal__form">
        {{{InputFile}}}
          {{{Button}}}
      </div>
    `
  }
}
