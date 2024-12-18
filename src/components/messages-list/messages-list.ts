import Block from "../../core/block";
import { message } from "../../utils/contact-list";
import { checkMessage } from "../../utils/validate-inputs";
import { ButtonArrow } from "../buttons/button-arrow";
import { ButtonDots } from "../buttons/button-dots";
import { ButtonFile } from "../buttons/button-file";
import { ImageMessage } from "../image-message";
import { InputCreateMessage } from "../inputs/input-create-message";
import Message from "../message/message";
import { AddDeleteUserModal, AddDeleteUserSelectedModal, FilesModal } from "../modals";
import { ModalWrapper } from "../wrappers/modals-wrapper";

type TMessagesList = {
  isSelectChat: boolean;
}

export default class MessagesList extends Block {
  constructor(props: TMessagesList) {
    super('div', {
      ...props,
      className: 'messages',
      isOpenAddDeleteUserModal: false,
      isClickAddUser: false,
      isClickDeleteUser: false,
      isClickAdd: false,
      isOpenFileModal: false,
      message: "",
      ButtonDots: new ButtonDots({
        onClick: () => {
          this.setProps({isOpenAddDeleteUserModal: !this.props.isOpenAddDeleteUserModal})
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
      AddDeleteUserModal: new AddDeleteUserModal({
        onClickAddUser: () => {
          this.setProps({isClickAddUser: true, isOpenAddDeleteUserModal: false})
        },
        onClickDeleteUser: () => {
          this.setProps({isClickDeleteUser: true, isOpenAddDeleteUserModal: false})
        },
      }),
      AddUserModal: new AddDeleteUserSelectedModal({
        isClickAdd: true
      }),
      DeleteUserModal: new AddDeleteUserSelectedModal({
        isClickAdd: false
      }),
      ModalWrapper: new ModalWrapper({
        onClick: () => {
          this.setProps({isClickDeleteUser: false, isClickAddUser: false})
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
      })
    })
  }

  public render(): string {
    return `
      {{#if isSelectChat}}
        <div class="messages-list">
          <div class="messages-list__user-container">
            <div class="messages-list__user">
              {{#if avatar}}
                <img class="messages-list__photo" src={{avatar}} alt="Фотография пользователя"/>
              {{else}}
                <div class="messages-list__mock-photo"></div>
              {{/if}}
              <p class="messages-list__chat-name">Вадим</p> <!--{{title}} -->
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
      {{#if isOpenAddDeleteUserModal}}
        {{{AddDeleteUserModal}}}
      {{/if}}
      {{#if isClickAddUser}}
        {{{ModalWrapper}}}
        {{{AddUserModal}}}
      {{/if}}
      {{#if isClickDeleteUser}}
        {{{ModalWrapper}}}
        {{{DeleteUserModal}}}
      {{/if}}
    `
  }
}
