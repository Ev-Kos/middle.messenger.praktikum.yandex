import Block from "../../core/block";
import { deleteChat, getChatUsers } from "../../services/chats";
import { connect } from "../../utils/connect";
import { message } from "../../utils/contact-list";
import { checkMessage } from "../../utils/validate-inputs";
import { ButtonArrow } from "../buttons/button-arrow";
import { ButtonDots } from "../buttons/button-dots";
import { ButtonFile } from "../buttons/button-file";
import { ImageMessage } from "../image-message";
import { InputCreateMessage } from "../inputs/input-create-message";
import Message from "../message/message";
import { ActionsWithChatModal, AddDeleteUserSelectedModal, FilesModal } from "../modals";
import { ModalWrapper } from "../wrappers/modals-wrapper";

class MessagesList extends Block {
  constructor() {
    super('div', {
      className: 'messages',
      isOpenFileModal: false,
      message: "",
      ButtonDots: new ButtonDots({
        onClick: () => {
          window.store.set({isOpenActionsWithChatModal: !window.store.state.isOpenActionsWithChatModal})
        }
      }),
      GetMessage: new Message({
        time: "11:24",
        text: message,
        isSend: false
      }),
      SendMessage: new Message({
        time: "12:24",
        text: "Круто!",
        isSend: true
      }),
      ImageMessage: new ImageMessage({
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9gpYQHrXhkUPdJMc7MUc_a8mWK9RipcS51w&s",
        alt: "Фотография",
        time: "15:00"
      }),
      ActionsWithChatModal: new ActionsWithChatModal({
        onClickAddUser: () => {
          window.store.set({isOpenActionsWithChatModal: false, isClickAddUserModal: true, isClickDeleteUserModal: false})
          getChatUsers(Number(window.store.state.activeChatId))
        },
        onClickDeleteUser: () => {
          window.store.set({isOpenActionsWithChatModal: false, isClickAddUserModal: false, isClickDeleteUserModal: true})
          getChatUsers(Number(window.store.state.activeChatId))
        },
        onClickDeleteChat: () => {
          if(window.store.state.activeChatId) {
            deleteChat({chatId: window.store.state.activeChatId})
          }
        }
      }),
      AddUserModal: new AddDeleteUserSelectedModal({
        isClickAdd: true
      }),
      DeleteUserModal: new AddDeleteUserSelectedModal({
        isClickAdd: false
      }),
      ModalWrapper: new ModalWrapper({
        onClick: () => {
          window.store.set({usersLength: null, users: [], isClickAddUserModal: false, isClickDeleteUserModal: false, isSearchUsers: null})
        }
      }),
      ButtonFile: new ButtonFile({
        onClick: () => {
          this.setProps({isOpenFileModal: !this.props.isOpenFileModal})
        }
      }),
      FilesModal: new FilesModal,
      InputCreateMessage: new InputCreateMessage({
        placeholderText: "Сообщение",
        name: "message",
        type: "text",
        onChange: (e: Event) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputCreateMessage, checkMessage(value));
            this.setProps({message: value});
          }
        }
      }),
      ButtonArrow: new ButtonArrow({
        onClick: () => {
          const error = checkMessage(this.props.message)
          if (error.isError) {
            this.setPropsForChildren(this.children.InputCreateMessage, error);
            return;
          }
          console.log(this.props.message)
          this.setPropsForChildren(this.children.InputCreateMessage, {value: ""});
        },
        isRight: true
      }),
    })
  }

  public render(): string {
    return `
      {{#if activeChatId}}
        <div class="messages-list">
          <div class="messages-list__user-container">
            <div class="messages-list__user">
              {{#if activeChatAvatar}}
                <img class="messages-list__photo" src={{getImage activeChatAvatar}} alt="Фотография пользователя"/>
              {{else}}
                <div class="messages-list__mock-photo"></div>
              {{/if}}
              <p class="messages-list__chat-name">{{activeChatTitle}}</p>
            </div>
            {{{ButtonDots}}}
          </div>
          <div class="messages-list__content">
            <p class="messages-list__date">19 июня</p> <!--getDate last_message.time true false-->
            <div class="messages-list__messages">
              <div class="messages-list__got-messages">
                {{{GetMessage}}} <!--time=getDate last_message.time false true-->
                {{{ImageMessage}}}
              </div>
              {{{SendMessage}}}
            </div>
          </div>
          <div class="messages-list__create-message-container">
            {{{ButtonFile}}}
            {{{InputCreateMessage}}}
            {{{ButtonArrow}}}
            {{#if isOpenFileModal}}
              {{{FilesModal}}}
            {{/if}}
          </div>
        </div>
      {{else}}
        <div class="not-select-chat">
          <span class="not-select-chat__text">Выберите чат чтобы отправить сообщение</span>
        </div>
      {{/if}}
      {{#if isOpenActionsWithChatModal}}
        {{{ActionsWithChatModal}}}
      {{/if}}
      {{#if isClickAddUserModal}}
        {{{ModalWrapper}}}
        {{{AddUserModal}}}
      {{/if}}
      {{#if isClickDeleteUserModal}}
        {{{ModalWrapper}}}
        {{{DeleteUserModal}}}
      {{/if}}
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    activeChatAvatar: state.activeChatAvatar,
    activeChatTitle: state.activeChatTitle,
    activeChatId: state.activeChatId,
    isOpenActionsWithChatModal: state.isOpenActionsWithChatModal,
    chats: state.chats,
    isClickAddUserModal: state.isClickAddUserModal,
    isClickDeleteUserModal: state.isClickDeleteUserModal
  };
};

export default connect(mapStateToProps)(MessagesList);
