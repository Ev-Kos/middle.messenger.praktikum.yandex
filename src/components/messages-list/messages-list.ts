import Block, { TBlockProps } from "../../core/block";
import { deleteChat, getChatUsers, wsChat } from "../../services/chats";
import { connect } from "../../utils/connect";
import { getDate } from "../../utils/functions/getDate";
import { checkMessage } from "../../utils/validate-inputs";
import { ButtonArrow } from "../buttons/button-arrow";
import { ButtonDots } from "../buttons/button-dots";
import { ButtonFile } from "../buttons/button-file";
import { InputCreateMessage } from "../inputs/input-create-message";
import MessagesGroup, { TMessagesGroupProps } from "../messages-group/messages-group";
import { ActionsWithChatModal, AddDeleteUserSelectedModal, FilesModal } from "../modals";
import fileLoadModal from "../modals/file-load-modal";
import { ModalWrapper } from "../wrappers/modals-wrapper";

type TMessagesListProps = {
  groups: TMessagesGroupProps[]
}

class MessagesList extends Block {
  constructor(props: TMessagesListProps) {
    super('div', {
      ...props,
      className: 'messages',
      ButtonDots: new ButtonDots({
        onMouseEnter: () => {
          window.store.set({
            isOpenActionsWithChatModal: !window.store.state.isOpenActionsWithChatModal
          })
        }
      }),
      GroupsList: props.groups?.map((item) => new MessagesGroup({ ...item})),
      ActionsWithChatModal: new ActionsWithChatModal({
        onClickAddUser: () => {
          window.store.set({
            isOpenActionsWithChatModal: false,
            isClickAddUserModal: true,
            })
          getChatUsers(Number(window.store.state.activeChatId))
        },
        onClickDeleteUser: () => {
          window.store.set({
            isOpenActionsWithChatModal: false,
            isClickDeleteUserModal: true
          })
          getChatUsers(Number(window.store.state.activeChatId))
        },
        onClickDeleteChat: () => {
          if(window.store.state.activeChatId) {
            deleteChat({chatId: window.store.state.activeChatId})
          }
        },
        onClickChangeChatAvatar: () => {
          window.store.set({
            isOpenActionsWithChatModal: false,
            isClickFileLoad: true,
            isChangeChatAvatar: true
          })
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
          window.store.set({
            usersLength: null,
            users: [],
            isClickAddUserModal: false,
            isClickDeleteUserModal: false,
            isSearchUsers: null,
            isClickFileLoad: false,
            isMessagePhoto: false,
            messagePhoto: null, messagePhotoFile: null,
            isChangeChatAvatar: false,
            chatAvatar: null, chatAvatarFile: null
          })
        }
      }),
      ButtonFile: new ButtonFile({
        onMouseEnter: () => {
          window.store.set({isOpenFileModal: !window.store.state.isOpenFileModal})
        }
      }),
      FilesModal: new FilesModal,
      FileLoadModal: new fileLoadModal({}),
      InputCreateMessage: new InputCreateMessage({
        placeholderText: "Сообщение",
        name: "message",
        type: "text",
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setPropsForChildren(this.children.InputCreateMessage, checkMessage(value));
          }
        },
        onKeyDown:(e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            if(e.key === "Enter") {
              const socket = window.socket;
              if(value.length > 0) {
                const error = checkMessage(value)
                if (error.isError) {
                  this.setPropsForChildren(this.children.InputCreateMessage, error);
                  return;
                }
                socket.sendMessage(value)
                this.setPropsForChildren(this.children.InputCreateMessage, {value: ""});
              }
              if(window.store.state.uploadedMessagePhoto) {
                socket.sendFile(String(window.store.state.uploadedMessagePhoto.id))
                window.store.set({uploadedMessagePhoto: null})
              }
            }
          }
        }
      }),
      ButtonArrow: new ButtonArrow({
        onClick: (e) => {
          e.preventDefault();
          const socket = window.socket;
          // @ts-ignore
          const props = this.children.InputCreateMessage.props
          if(props.value.length > 0) {
            const error = checkMessage(props.value)
            if (error.isError) {
              this.setPropsForChildren(this.children.InputCreateMessage, error);
              return;
            }
            socket.sendMessage(props.value)
            this.setPropsForChildren(this.children.InputCreateMessage, {value: ""});
          }
          if(window.store.state.uploadedMessagePhoto) {
            socket.sendFile(String(window.store.state.uploadedMessagePhoto.id))
            window.store.set({uploadedMessagePhoto: null})
          }
        },
        isRight: true
      }),
    })
  }

  componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps): boolean {
    if (oldProps === newProps) {
      return false;
    }

		if(newProps && newProps.activeChatId !== oldProps.activeChatId && newProps.activeChatId !== null) {
			wsChat(newProps.activeChatId);
      getChatUsers(newProps.activeChatId)
		}

		if ((newProps && newProps.messagesArr !== oldProps.messagesArr)
      || (newProps && newProps.newMessage !== oldProps.newMessage)) {
			const { messagesArr } = newProps;
			let allMessages = [...messagesArr]

      const groups: TMessagesGroupProps[] = [];
      const sortedMessages = allMessages.sort((a, b) => Number(new Date(a.time)) - Number(new Date(b.time)));

      sortedMessages.forEach((item) => {
        const date = getDate(item.time, false, false)
        const index = groups.findIndex((elem) => elem.date === date);
        if(index !== -1) {
          groups[index].messages.push({...item})
        } else {
          groups.push({messages: [item], date: String(date)})
        }
      })

      this.children.GroupsList = groups.map((item: TMessagesGroupProps) =>
        new MessagesGroup({ ...item}))
      const lastGroup = this.children.GroupsList[this.children.GroupsList.length - 1];

      if(lastGroup) {
        setTimeout(() => {
          window.store.set({isScrollMessages: true})
        }, 0)
      }
    }
    return true;
  }

  public render(): string {
    return `
      {{#if activeChatId}}
        <div class="messages-list">
          <div class="messages-list__user-container">
            <div class="messages-list__user">
              {{#if activeChatAvatar}}
                <img class="messages-list__photo" src="{{getImage activeChatAvatar}}" alt="Фотография пользователя"/>
              {{else}}
                <div class="messages-list__mock-photo"></div>
              {{/if}}
              <p class="messages-list__chat-name">{{activeChatTitle}}</p>
            </div>
            {{{ButtonDots}}}
          </div>
          <ul class="messages-list__messages-groups">
            {{#each GroupsList}}
              {{{ this }}}
            {{/each}}
          </ul>
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
      {{#if isClickFileLoad}}
        {{{ModalWrapper}}}
        {{{FileLoadModal}}}
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
    isClickAddUserModal: state.isClickAddUserModal,
    isClickDeleteUserModal: state.isClickDeleteUserModal,
    newMessage: state.newMessage,
    messagesArr: state.messagesArr,
    isClickFileLoad: state.isClickFileLoad,
    isOpenFileModal: state.isOpenFileModal,
    uploadedMessagePhoto: state.uploadedMessagePhoto,
  };
};

export default connect(mapStateToProps)(MessagesList as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
