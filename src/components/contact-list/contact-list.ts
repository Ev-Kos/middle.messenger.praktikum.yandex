import Block from "../../core/block";
import { contactList } from "../../utils/contact-list";
import { ContactCard } from "../contact-card";
import { InputSearch } from "../inputs/input-search";
import { Link } from "../link";

export default class ContactList extends Block {
  constructor() {
    super('div', {
      className: 'container',
      searchValue: "",
      selected_id: "",
      Link: new Link({
        to: "#",
        modifierLink: "container__search-link",
        text: "Профиль >"
      }),
      InputSearch: new InputSearch({
        placeholderText: 'Поиск',
        name: 'seach',
        type: 'text',
        onChange: (e) => {
          if(e.target instanceof HTMLInputElement) {
            const value = e.target.value;
            this.setProps({
              searchValue: value
            })
            console.log(this.props.searchValue)
          }
        }
      }),
      Chats: contactList.map(
        (chatProps) =>
            new ContactCard({
                ...chatProps
            }),
      ),
    })
  }
  public render(): string {
    return `
      <div class="container__search">
        {{{Link}}}
        {{{InputSearch}}}
      </div>
      <ul class="container__list">
        {{#each Chats}}
          {{{ this }}}
        {{/each}}
      </ul>
    `
  }
}

