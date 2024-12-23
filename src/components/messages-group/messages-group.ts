import Block, { TBlockProps } from "../../core/block";
import { connect } from "../../utils/connect";
import { TMessages } from "../../utils/types";
import Message from "../message/message";

export type TMessagesGroupProps = {
  messages: TMessages[],
  date: string,
  isSend?: boolean,
  isText?:  boolean,
}

class MessagesGroup extends Block {
  constructor(props: TMessagesGroupProps) {
    super("div", {
      ...props,
      className: "messages-group",
      Messages: props.messages.map(
				(item) => new Message({ ...item })
			),
    });
  }

  componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps): boolean {
    if (oldProps === newProps) {
      return false;
    }
    if(newProps && newProps.isScrollMessages === true) {
      const messagesGroup = document.querySelectorAll(".messages-group")
      const lastMessagesGroup = messagesGroup[messagesGroup.length - 1]

      const mess = lastMessagesGroup.getElementsByTagName("li")
      const lastMessage = mess[mess.length - 1];
      if(lastMessage) {
          setTimeout(() => {
            lastMessage.scrollIntoView({
              behavior: 'smooth', block: 'nearest', inline: 'end'
          });
        }, 0)
      }
      window.store.set({isScrollMessages: false})
    }
    return true
  }

  public render(): string {
    this.dispatchComponentDidMount();
    const id = window.store.state.user?.id;
    const { Messages } =  this.children;
    const {partisipants} = window.store.state

    if(Array.isArray(Messages)) {
      Messages.forEach((item) => {
        const user = partisipants?.find((elem) => elem.id === item.props.user_id)
        item.setProps({isSend: item.props.user_id === id, isText: item.props.type === "message", user: user})
      })
    }
    return `
      <p class="messages-group__date">{{date}}</p>
      <ul class="messages-group__messages">
        {{#each Messages}}
					{{{ this }}}
				{{/each}}
      </ul>
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isScrollMessages: state.isScrollMessages,
    groups: state.groups
  };
}

export default connect(mapStateToProps)(MessagesGroup as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);

