import { ButtonArrow, FileLoadModal, ModalWrapper, ProfileInfo } from "../../components";
import Block from "../../core/block";

export default class ProfilePage extends Block {
  constructor() {
    super("section", {
      className: "profile-page",
      isClickFileLoad: false,
      ButtonArrow: new ButtonArrow({
        onClick: () => {
          console.log("click")
        },
        isRight: false
      }),
      ProfileInfo: new ProfileInfo({
        onClickButtonAvatar: () => {
          this.setProps({isClickFileLoad: true})
        }
      }),
      FileLoadModal: new FileLoadModal,
      ModalWrapper: new ModalWrapper({
        onClick: () => {
          this.setProps({isClickFileLoad: false})
        }
      }),
    });
  }

  public render(): string {
    return `
      <div class="profile-page__button-back">
        {{{ButtonArrow}}}
      </div>
      {{!-- isChangeInfo="true" (Изменение основной информации)
        isChangePassword="true" (Изменение пароля)
        isNotChange="true" (Профиль)
      --}}
      {{{ProfileInfo}}}
      {{#if isClickFileLoad}}
        {{{ModalWrapper}}}
        {{{FileLoadModal}}}
      {{/if}}
    `
  }
}
