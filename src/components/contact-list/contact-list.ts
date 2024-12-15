import Block, { TBlockProps } from "../../core/block";
import { getChats } from "../../services/chats";
import { connect } from "../../utils/connect";
import { ROUTES } from "../../utils/constants";
import { TGetChatsResponse } from "../../utils/types";
import { withRouter } from "../../utils/withRouter";
import { Button } from "../buttons/button";
import { ButtonCreateChat } from "../buttons/button-create-chat";
import { ContactCard } from "../contact-card";
import { InputSearch } from "../inputs/input-search";
import { CreateChatModal } from "../modals";
import { ModalWrapper } from "../wrappers/modals-wrapper";

type TContactList = {
  chats: TGetChatsResponse[],
  limitMessages: number,
  offsetMessages: number,
}

class ContactList extends Block {
  constructor(props: TContactList) {
    super('div', {
      ...props,
      className: 'container',
      searchValue: "",
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
      Chats: props.chats.map(
        (chatProps: TGetChatsResponse) =>
          new ContactCard({
              ...chatProps,
              onClick: () => {
                window.store.set({activeChatAvatar: chatProps.avatar, activeChatTitle: chatProps.title, activeChatId: chatProps.id})
              },
          }),
      ),
      ButtonCreateChat: new ButtonCreateChat({
        onClick: () => {
          window.store.set({isCreateChatModal: true})
        },
      }),
      CreateChatModal: new CreateChatModal({}),
      ModalWrapper: new ModalWrapper({
        onClick: () => {
          window.store.set({isCreateChatModal: false})
        }
      }),
    })
  }

  public render(): string {

console.log(this.props.chats)
    return `
      <div class="container__search">
        {{{ButtonLink}}}
        {{{InputSearch}}}
      </div>
      <div class="container__button-create">
        {{{ButtonCreateChat}}}
      </div>
      <ul class="{{#if isScroll}}container__list{{else}}container__list-whithout-scroll{{/if}}">
        {{#unless chatsLength}}
          <p class="container__empty-list">{{#if isSearch}}Ничего не найдено{{else}}Пока нет созданных чатов{{/if}}</p>
          {{else}}
            {{#each Chats}}
              {{{ this }}}
            {{/each}}
        {{/unless}}
      </ul>
      {{#if isCreateChatModal}}
        {{{ModalWrapper}}}
        {{{CreateChatModal}}}
      {{/if}}
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  console.log(state)
  return {
    isLoading: state.isLoading,
    //chats: state.chats,
    chatsLength: state.chatsLength,
    isScroll: state.isScroll,
    limitMessages: state.limitMessages,
    offsetMessages: state.offsetMessages,
    isCreateChatModal: state.isCreateChatModal,
    activeChatId: state.activeChatId
  };
};

export default connect(mapStateToProps)(ContactList as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
