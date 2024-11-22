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

// {{#> ContactList contactList=contactList}}{{/ ContactList}}
//   {{> MessagesList isSelectChat="true"}}
//   {{#if isClickAddOrDeleteUser}}
//     {{> AddDeleteUserSelectedModal}}
//   {{/if}}
