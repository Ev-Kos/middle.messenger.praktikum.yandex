import Block, { TBlockProps } from "../../core/block";
import { createChats } from "../../services/chats";
import { connect } from "../../utils/connect";
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
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            window.store.set({ newChatId: null });
            const value = e.target.value;
            this.setPropsForChildren(this.children.Input, {value: value});
            this.setProps({
              title: {title: value},
            });
          }
        },
      }),
      ButtonCreate: new Button({
        type: "submit",
        text: "Создать",
        onClick: (e) => {
          e.preventDefault();
          if(this.props.title.title.length > 0) {
            createChats(this.props.title)
          }
        }
      }),
    });
  }

  public render(): string {
    const { newChatId } = this.props;
    const { Input } = this.children;

    if (!Array.isArray(Input) && (newChatId)) {
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
    newChatId: state.newChatId,
  };
};

export default connect(mapStateToProps)(CreateChatModal as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
