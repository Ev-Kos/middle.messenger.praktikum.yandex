import { ContactList, MessagesList } from "../../components";
import Block from "../../core/block";
import { connect } from "../../utils/connect";
import { withRouter } from "../../utils/withRouter";


class ChatPage extends Block {
  constructor(props) {
    super('section', {
      ...props,
      className: 'chat-page',
      ContactList: new ContactList({
        chats: props.chats
      }),
      MessagesList: new MessagesList({})
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
    chatsLength: state.chatsLength,
    limitMessages: state.limitMessages,
    offsetMessages: state.offsetMessages,
    chats: state.chats,
  };
};

export default connect(mapStateToProps)(ChatPage);
