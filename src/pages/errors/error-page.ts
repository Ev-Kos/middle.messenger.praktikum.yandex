import { Button } from "../../components";
import Block from "../../core/block";
import { getChats } from "../../services/chats";
import { ROUTES } from "../../utils/constants";

export default class ErrorPage extends Block {
  constructor() {
    super("section", {
      className: "error-page",
      Link: new Button({
        type: "button",
        onClick: async () => {
          window.router.go(ROUTES.chat)
          await getChats({
            limit: Number(window.store.state.limitChat),
            offset: Number(window.store.state.offsetChat)
          })
        },
        text: "Назад к чатам?"
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
