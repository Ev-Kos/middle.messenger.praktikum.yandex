import { ContactList, MessagesList } from "../../components";
import Block from "../../core/block";

export default class ChatPage extends Block {
  constructor() {
    super('section', {
      className: 'chat-page',
      ContactList: new ContactList,
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

//   {{> MessagesList isSelectChat="true"}}
//   {{#if isClickAddOrDeleteUser}}
//     {{> AddDeleteUserSelectedModal}}
//   {{/if}}
