import { ContactList, MessagesList } from "../../components";
import Block  from "../../core/block";
import { connect } from "../../utils/connect";

class ChatPage extends Block {
  constructor() {
    super('section', {
      className: 'chat-page',
      events: {
        mousemove : (event: MouseEvent) => {
          // if(!window.store.state.isNewCount) {
          //   let  x = event.pageX
          //   let y = event.pageY
          //   window.store.set({coordinates: {x: x, y: y}, isNewCount: true})
          // }
        }
      },
      ContactList: new ContactList({}),
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
  };
};

export default connect(mapStateToProps)(ChatPage);
