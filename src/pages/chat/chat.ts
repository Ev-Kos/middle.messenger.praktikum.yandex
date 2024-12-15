import { ContactList, MessagesList } from "../../components";
import Block, { TBlockProps } from "../../core/block";
import { connect } from "../../utils/connect";
import { TGetChatsResponse } from "../../utils/types";

type TChatPageProps = {
  chats: TGetChatsResponse[],
  limitMessages: number,
  offsetMessages: number,
}

class ChatPage extends Block {
  constructor(props: TChatPageProps) {
    super('section', {
      className: 'chat-page',
      ContactList: new ContactList({
        chatList: props.chats,
        limitMessages: props.limitMessages,
        offsetMessages: props.offsetMessages
      }),
      MessagesList: new MessagesList({}),
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

export default connect(mapStateToProps)(ChatPage as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
