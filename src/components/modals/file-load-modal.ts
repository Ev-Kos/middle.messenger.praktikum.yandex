import Block from "../../core/block";
import { uploadChatAvatar } from "../../services/chats";
import { uploadResource } from "../../services/resources";
import { changeUserAvatar } from "../../services/users";
import { connect } from "../../utils/connect";
import { Button } from "../buttons/button";

class FileLoadModal extends Block {
  constructor() {
    super("form", {
      className: "form-modal form-modal__file-load-modal",
      events: {
        change: (e: Event) => {
          if(e.target instanceof HTMLInputElement) {
            const { files } = e.target;
            if(files?.length) {
              if(window.store.state.isMessagePhoto) {
                window.store.set(
                  {messagePhoto: {src: URL.createObjectURL(files[0]), alt: files[0].name},
                    messagePhotoFile: files[0]
                })
              }
              else if(window.store.state.isChangeChatAvatar) {
                window.store.set(
                  {chatAvatar: {src: URL.createObjectURL(files[0]), alt: files[0].name},
                    chatAvatarFile: files[0]
                })
              }
              else {
                window.store.set(
                  {userAvatar: {src: URL.createObjectURL(files[0]), alt: files[0].name},
                    userAvatarFile: files[0]
                })
              }
            }
          }
        },
      },
      Button: new Button({
        type: "submit",
        text: "Загрузить",
        isLoading: window.store.state.isMessagePhoto ? window.store.state.isLoadingUploadResouse : window.store.state.isLoadingUploadUserAvatar,
        onClick: (e: Event) => {
          e.preventDefault();
          if(window.store.state.userAvatarFile) {
            changeUserAvatar(window.store.state.userAvatarFile)
          }
          if(window.store.state.messagePhotoFile) {
            uploadResource(window.store.state.messagePhotoFile)
          }
          if(window.store.state.chatAvatarFile && window.store.state.activeChatId) {
            uploadChatAvatar(window.store.state.activeChatId, window.store.state.chatAvatarFile)
          }
        }
      }),
      DeleteAvatar: new Button({
        text: "Заменить аватар",
        type: "button",
        onClick: () => {
          window.store.set({userAvatar: null, userAvatarFile: null})
        },
        modifierButton: "button-image-avatar",
        modifierText: "button-avatar__text"
      }),
      DeleteMessagePhoto: new Button({
        text: "Заменить",
        type: "button",
        onClick: () => {
          window.store.set({messagePhoto: null, messagePhotoFile: null})
        },
        modifierButton: "button-delete-message-photo",
        modifierText: "button-delete-message-photo__text"
      }),
      DeleteChatAvatar: new Button({
        text: "Заменить аватар",
        type: "button",
        onClick: () => {
          window.store.set({activeChatAvatar: null, chatAvatar: null, chatAvatarFile: null})
        },
        modifierButton: "button-image-avatar",
        modifierText: "button-avatar__text"
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
        {{#if userAvatar}}
          <img class="button-avatar__image" src={{userAvatar.src}} alt={{userAvatar.alt}}>
          <div class="user-avatar-mask">
            {{{DeleteAvatar}}}
          </div>
        {{else if messagePhoto}}
          <img class="message-photo-image" src={{messagePhoto.src}} alt={{messagePhoto.alt}} >
          <div class="message-photo-image-mask">
            {{{DeleteMessagePhoto}}}
          </div>
        {{else if activeChatAvatar}}
          <img class="button-avatar__image" src={{getImage activeChatAvatar}} alt="Аватар" >
          <div class="user-avatar-mask">
            {{{DeleteChatAvatar}}}
          </div>
        {{else if chatAvatar}}
          <img class="button-avatar__image" src={{chatAvatar.src}} alt={{chatAvatar.alt}} >
          <div class="user-avatar-mask">
            {{{DeleteChatAvatar}}}
          </div>
        {{else}}
          <div class="{{#if isMessagePhoto}}input-file__wrap-message{{else}}input-file__wrap{{/if}}">
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
    isMessagePhoto: state.isMessagePhoto,
    messagePhoto: state.messagePhoto,
    isLoadingUploadResouse: state.isLoadingUploadResouse,
    isLoadingUploadUserAvatar: state.isLoadingUpload,
    activeChatAvatar: state.activeChatAvatar,
    isChangeChatAvatar: state.isChangeChatAvatar,
    chatAvatarFile: state.chatAvatar,
    activeChatId: state.activeChatId
  };
};

export default connect(mapStateToProps)(FileLoadModal);
