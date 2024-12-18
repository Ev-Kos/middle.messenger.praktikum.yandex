import Block from "../../core/block";
import { changeUserAvatar } from "../../services/users";
import { connect } from "../../utils/connect";
import { Button } from "../buttons/button";

class FileLoadModal extends Block {
  constructor() {
    super("form", {
      className: "form-modal",
      events: {
        change: (e: Event) => {
          if(e.target instanceof HTMLInputElement) {
            const { files } = e.target;
            if(files?.length) {
              window.store.set(
                {userAvatar: {src: URL.createObjectURL(files[0]), alt: files[0].name},
                  userAvatarFile: files[0]
              })
            }
          }
        },
      },
      Button: new Button({
        type: "submit",
        text: "Поменять",
        onClick: (e: Event) => {
          e.preventDefault();
          if(window.store.state.userAvatarFile) {
            changeUserAvatar(window.store.state.userAvatarFile)
          }
        }
      }),
      DeleteAvatar: new Button({
        text: "Удалить аватар",
        type: "button",
        onClick: () => {
          window.store.set({userAvatar: null, userAvatarFile: null})
        },
        modifierButton: "button-image-avatar",
        modifierText: "button-avatar__text"
      })
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
        {{#if userAvatar}}
          <img class="button-avatar__image" src={{userAvatar.src}} alt={{chatAvatar.alt}}>
          <div class="user-avatar-mask">
            {{{DeleteAvatar}}}
          </div>
        {{else}}
          <div class="input-file__wrap">
            <input class="input-file" type="file" name="input-file" value={{ value }}/>
            <p class="input-file__text">Выбрать файл на компьютере</p>
          </div>
        {{/if}}
        {{{Button}}}
      </div>
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    chatAvatar: state.chatAvatar,
    userAvatar: state.userAvatar,
  };
};

export default connect(mapStateToProps)(FileLoadModal);
