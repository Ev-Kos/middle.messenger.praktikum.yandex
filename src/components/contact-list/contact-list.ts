import Block, { TBlockProps } from "../../core/block";
import { getChats } from "../../services/chats";
import { connect } from "../../utils/connect";
import { ROUTES } from "../../utils/constants";
import { Button } from "../buttons/button";
import { ContactCard } from "../contact-card";
import { TContactCardProps } from "../contact-card/contact-card";
import { InputSearch } from "../inputs/input-search";

type TContactList = {
  chats: TContactCardProps[],
  onSelectChat?: (event: { }) => void,
  limitMessages: number,
  offsetMessages: number,
}

class ContactList extends Block {
  constructor(props: TContactList) {
    super('div', {
      ...props,
      className: 'container',
      searchValue: "",
      selected_id: "",
      isSearch: false,
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
              searchValue: value,
              isSearch: false
            })
          }
        },
        onKeyDown: (e) => {
          if(e.key === "Enter") {
            if(this.props.searchValue.length !== 0) {
              getChats({limit: props.limitMessages, offset: props.offsetMessages, title: this.props.searchValue})
              this.setProps({
                isSearch: true
              })
            }
          }
        }
      }),
      Chats: props.chats?.map(
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
          <p class="container__empty-list">{{#if isSearch}}Ничего не найдено{{else}}Пока нет созданных чатов{{/if}}</p>
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
    chatsLength: state.chatsLength,
    limitMessages: state.limitMessages,
    offsetMessages: state.offsetMessages
  };
};

export default connect(mapStateToProps)(ContactList as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
