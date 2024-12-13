import Block from "../../core/block";
import { ROUTES } from "../../utils/constants";
import { contactList } from "../../utils/contact-list";
import { Button } from "../buttons/button";
import { ContactCard } from "../contact-card";
import { InputSearch } from "../inputs/input-search";

export default class ContactList extends Block {
  constructor() {
    super('div', {
      className: 'container',
      searchValue: "",
      selected_id: "",
      ButtonLink: new Button({
        type: "button",
        onClick: () => { window.router.go(ROUTES.profile)},
        modifierButton: "container__search-link",
        modifierText: "container__search-link-text",
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
        {{{ButtonLink}}}
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

