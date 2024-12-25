import { Button } from "../../components";
import Block from "../../core/block";
import { getChats } from "../../services/chats";
import { ROUTES } from "../../utils/constants";
import { withRouter } from "../../utils/withRouter";

class NotFoundPage extends Block {
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
          <h1 class="error-page__title">400</h1>
          <p class="error-page__text">Не туда попали</p>
        </div>
        {{{Link}}}
      </div>
    `
  }
}

export default withRouter(NotFoundPage);
