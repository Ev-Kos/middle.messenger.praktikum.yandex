import Block from "../../core/block";
import { createChats } from "../../services/chats";
import { connect } from "../../utils/connect";
import { keydownHandler } from "../../utils/keydown-handler";
import { Button } from "../buttons/button";
import { ButtonAvatar } from "../buttons/button-avatar";
import { InputForm } from "../inputs/input-form";

class CreateChatModal extends Block {
  constructor() {
    super("form", {
      className: "form-modal",
      title: {
        title: ""
      },
      ButtonAvatar: new ButtonAvatar({
        text: "Загрузить аватар",
        isCreateChat: true,
        onChange: (e: Event) => {
          if(e.target instanceof HTMLInputElement) {
            const { files } = e.target;
            if(files?.length) {
              window.store.set(
                {chatAvatar: {src: URL.createObjectURL(files[0]), alt: files[0].name},
                  chatAvatarFile: files[0]
              })
            }
          }
        },
        deleteAvatar: () => {
          window.store.set({chatAvatar: null, chatAvatarFile: null})
        }
      }),
      Input: new InputForm({
        name: "title",
        type: "text",
        text: "Название",
        onChange: (e: Event) => {
          if(e.target instanceof HTMLInputElement) {
            window.store.set({ newChatId: null });
            const value = e.target.value;
            this.setProps({
              title: {title: value},
            });
          }
        },
        onKeyDown: (e: KeyboardEvent) => {keydownHandler(e)}
      }),
      ButtonCreate: new Button({
        type: "submit",
        text: "Создать",
        isLoading: window.store.state.isLoadingChangeChats,
        onClick: (e: Event) => {
          e.preventDefault();
          if(this.props.title.title.length > 0) {
            createChats(this.props.title)
            window.store.set({ newChatTitle: this.props.title.title})
          }
        }
      }),

    });
  }

  public render(): string {
    const { isCreateChat } = this.props;
    const { Input } = this.children;

    if (!Array.isArray(Input) && (isCreateChat)) {
      Input.setPropsForChildren(Input, {value: ""});
    }

    return `
      <h1 class="form-modal__title">Создать чат</h1>
      {{{ButtonAvatar}}}
         <div class="form-modal__form">
           {{{Input}}}
           {{{ButtonCreate}}}
         </div>
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isCreateChat: state.isCreateChat,
    isLoadingChangeChats: state.isLoadingChangeChats
  };
};

export default connect(mapStateToProps)(CreateChatModal);
