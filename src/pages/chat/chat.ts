import { ContactList, MessagesList } from "../../components";
import Block from "../../core/block";
import { connect } from "../../utils/connect";
import { contactList } from "../../utils/contact-list";

class ChatPage extends Block {
  constructor() {
    super('section', {
      className: 'chat-page',
      ContactList: new ContactList({
        chats: contactList
      }),
      MessagesList: new MessagesList({
        isSelectChat: true
      })
    })
  }

  public render(): string {
    return `
      {{{ContactList}}}
      {{{MessagesList}}}
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isLoading: state.isLoading,
    chats: contactList,
    chatsLength: state.chatsLength,
    limitMessages: state.limitMessages,
    offsetMessages: state.offsetMessages
  };
};

export default connect(mapStateToProps)(ChatPage);
