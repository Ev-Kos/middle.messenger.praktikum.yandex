import Block, { TBlockProps } from "../../core/block";
import { connect } from "../../utils/connect";
import { ROUTES } from "../../utils/constants";
import { contactList } from "../../utils/contact-list";
import { Button } from "../buttons/button";
import { ContactCard } from "../contact-card";
import { TContactCardProps } from "../contact-card/contact-card";
import { InputSearch } from "../inputs/input-search";

interface ListElementProps {
  chats: TContactCardProps[],
  onSelectChat?: (event: { }) => void,
}

class ContactList extends Block {
  constructor(props: ListElementProps) {
    super('div', {
      ...props,
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
        (chatProps: TContactCardProps) =>
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
      <ul class="{{#if chatsLength}}container__list{{else}}container__list-whithout-scroll{{/if}}">
        {{#unless chatsLength}}
          <p class="container__empty-list">Пока нет созданных чатов</p>
          {{else}}
            {{#each Chats}}
              {{{ this }}}
            {{/each}}
        {{/unless}}
      </ul>
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isLoading: state.isLoading,
    chats: state.chats,
    chatsLength: state.chatsLength
  };
};

export default connect(mapStateToProps)(ContactList as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
