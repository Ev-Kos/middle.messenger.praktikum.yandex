import { ContactList } from "../../components";
import Block from "../../core/block";

export default class ChatPage extends Block {
  constructor() {
    super('section', {
      className: 'chat-page',
      ContactList: new ContactList
    })
  }

  public render(): string {
    return `
      {{{ContactList}}}
    `
  }
}

//   {{> MessagesList isSelectChat="true"}}
//   {{#if isClickAddOrDeleteUser}}
//     {{> AddDeleteUserSelectedModal}}
//   {{/if}}
