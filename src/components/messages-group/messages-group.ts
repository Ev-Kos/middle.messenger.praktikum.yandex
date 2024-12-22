import Block, { TBlockProps } from "../../core/block";
import { TMessages } from "../../utils/types";
import Message from "../message/message";

export type TMessagesGroupProps = {
  messages: TMessages[],
  date: string,
  isSend?: boolean,
  isText?: boolean
}

export default class MessagesGroup extends Block {
  constructor(props: TMessagesGroupProps) {
    super("div", {
      ...props,
      className: "messages-group",
      Messages: props.messages.map(
				(item) => new Message({ ...item })
			),
    });
  }

  // componentDidUpdate(oldProps: TBlockProps, newProps: TBlockProps): boolean {
  //   if (oldProps === newProps) {
  //     return false;
  //   }

  //   if(newProps && newProps.messages !== oldProps.messages) {
  //     this.children.Messages = newProps.messages?.map((item: any) =>
  //       new Message({
  //         ...item,
  //     }),
  //   )
  //   }
  //   return true
  // }

  public render(): string {

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
