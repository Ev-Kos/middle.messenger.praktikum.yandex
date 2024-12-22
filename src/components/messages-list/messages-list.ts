import Block, { TBlockProps } from "../../core/block";
import { deleteChat, getChatUsers, getNewMessagesCount, getTokenChat, wsChat } from "../../services/chats";
import { connect } from "../../utils/connect";
import { getDate } from "../../utils/functions/getDate";
import { TMessages } from "../../utils/types";
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
      message: "",
      ButtonDots: new ButtonDots({
        onClick: () => {
          window.store.set({isOpenActionsWithChatModal: !window.store.state.isOpenActionsWithChatModal})
        }
      }),
      GroupsList: props.groups?.map((item) => new MessagesGroup({ ...item})),
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
          window.store.set({
            usersLength: null,
            users: [],
            isClickAddUserModal: false,
            isClickDeleteUserModal: false,
            isSearchUsers: null,
            isClickFileLoad: false,
            isMessagePhoto: false,
            messagePhoto: null, messagePhotoFile: null
          })
        }
      }),
      ButtonFile: new ButtonFile({
        onClick: () => {
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
            this.setProps({message: value});
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
                this.setProps({message: ""});
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
        onClick: () => {
          const socket = window.socket;
          if(this.props.message.length > 0) {
            const error = checkMessage(this.props.message)
            if (error.isError) {
              this.setPropsForChildren(this.children.InputCreateMessage, error);
              return;
            }
            socket.sendMessage(this.props.message)
            this.setPropsForChildren(this.children.InputCreateMessage, {value: ""});
            this.setProps({message: ""});
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

		if(newProps && newProps.activeChatId !== oldProps.activeChatId) {
			wsChat(newProps.activeChatId);
      getChatUsers(newProps.activeChatId)
		}

		if ((newProps && newProps.messages !== oldProps.messages) || (newProps && newProps.newMessage !== oldProps.newMessage)) {
			const { messages } = newProps;
			let allMessages = [...messages]
      const gropus: TMessagesGroupProps[] = [];
      const sortedMessages = allMessages.sort((a, b) => Number(new Date(a.time)) - Number(new Date(b.time)));

      sortedMessages.forEach((item) => {
        const date = getDate(item.time, false, false)
        const index = gropus.findIndex((elem) => elem.date === date);
        if(index !== -1) {
          gropus[index].messages.push({...item})
        } else {
          gropus.push({messages: [item], date: String(date)})
        }
      })

      if(gropus && gropus.length !== 0) {
        this.children.GroupsList = gropus.map((item: TMessagesGroupProps) =>
          new MessagesGroup({ ...item}))
      }
		}

		return true;
	}

  //public componentDidMount() {
		// setTimeout(() => {
		// 	const scrollContent = document.querySelector(".messages-list-content");

		// 	if (this.props.messages && scrollContent) {
		// 		const socket = window.socket;
		// 		const lastMessageId =
		// 			this.props.messages[this.props.messages.length - 1].id;

		// 		const getOldMessages = (e) => {
		// 			const element = e.target;
		// 			window.store.set({ lastMessageId, chatScrolled: true });

		// 			if (element.scrollTop === 0) {
		// 				socket.getOldMessages(lastMessageId)
		// 			}
		// 		};

		// 		scrollContent?.addEventListener("scroll", getOldMessages);

		// 		const getMessages = () => {
		// 			const chatScrolled  = window.store.state.chatScrolled;

		// 			console.log("scrolled", chatScrolled);

		// 			const isBottom =
		// 				Math.floor(scrollContent.scrollTop + scrollContent.clientHeight) ===
		// 				scrollContent.scrollHeight + 1;
		// 			if (!isBottom && !chatScrolled) {
		// 				scrollContent.scrollTop = scrollContent.scrollHeight;
		// 			}
		// 		};

		// 		getMessages();
		// 		setInterval(getMessages, 10000);
		// 	}

		// 	return true;
		// }, 0);
	//}

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
            <ul class="messages-list__messages-groups">
              {{#each GroupsList}}
                {{{ this }}}
              {{/each}}
            </ul>
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
    messages: state.messages,
    groups: state.groups,
    isClickFileLoad: state.isClickFileLoad,
    isOpenFileModal: state.isOpenFileModal,
    uploadedMessagePhoto: state.uploadedMessagePhoto,
  };
};

export default connect(mapStateToProps)(MessagesList as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
