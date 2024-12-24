import { ButtonArrow, ProfileInfo } from "../../components";
import Block from "../../core/block";
import { getChats } from "../../services/chats";
import { ROUTES } from "../../utils/constants";

export default class ProfilePage extends Block {
  constructor() {
    super("section", {
      className: "profile-page",
      isClickFileLoad: window.store.state.isClickFileLoad,
      ButtonArrow: new ButtonArrow({
        onClick: () => {
          window.router.go(ROUTES.chat)
          getChats({
            limit: Number(window.store.state.limitChat),
            offset: Number(window.store.state.offsetChat)
          })
          window.store.set({isNotChange: true, isChangePassword: false})
        },
        isRight: false
      }),
      ProfileInfo: new ProfileInfo({}),
    });
  }

  public render(): string {
    return `
      <div class="profile-page__button-back">
        {{{ButtonArrow}}}
      </div>
      {{{ProfileInfo}}}
    `
  }
}
