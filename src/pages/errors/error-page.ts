import { Link } from "../../components";
import Block from "../../core/block";

export default class ErrorPage extends Block {
  constructor() {
    super("section", {
      className: "error-page",
      Link: new Link({
        to: "#",
        text: "Назад к чатам"
      })
    });
  }

  public render(): string {
    return `
      <div class="error-page__content">
        <div class="error-page__error-info">
          <h1 class="error-page__title">500</h1>
          <p class="error-page__text">Мы уже фиксим</p>
        </div>
        {{{Link}}}
      </div>
    `
  }
}
