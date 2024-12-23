import Block, { TBlockProps } from "../../core/block";
import { getChats, getNewMessagesCount } from "../../services/chats";
import { connect } from "../../utils/connect";
import { ROUTES } from "../../utils/constants";
import { TGetChatsResponse } from "../../utils/types";
import { Button } from "../buttons/button";
import { ButtonCreateChat } from "../buttons/button-create-chat";
import { ContactCard } from "../contact-card";
import { InputSearch } from "../inputs/input-search";
import { CreateChatModal } from "../modals";
import { ModalWrapper } from "../wrappers/modals-wrapper";

type TContactList = {
  chats: TGetChatsResponse[],
  limitChat: number,
  offsetChat: number,
}

class ContactList extends Block {
  constructor(props: TContactList) {
    super('div', {
      ...props,
      className: 'container',
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
        onKeyDown:(e) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;
          if(e.key === "Enter") {
            if(value.length !== 0) {
              getChats({limit: props.limitChat, offset: props.offsetChat, title: value})
              this.setProps({
                isSearch: true
              })
            } else {
              getChats({limit: props.limitChat, offset: props.offsetChat})
            }
          }
        }
      }),
      Chats: props.chats?.map(
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

  componentDidUpdate(oldProps?: TBlockProps, newProps?: TBlockProps): boolean {
    if (oldProps === newProps) {
      return false;
    }
    if(newProps && newProps.coordinates !== oldProps?.coordinates && window.store.state.isNewCount) {
      const allChats = window.store.state.chats;
      const idsChats = allChats?.map((item) => item.id)
      setTimeout(() => {
        if(idsChats && idsChats.length > 0) {
          idsChats.forEach((item) => {
            getNewMessagesCount(item)
          })
        }
        window.store.set({isNewCount: false})
      }, 8000)
    }
    if (newProps && newProps.chats) {
      this.children.Chats = newProps.chats.map(
        (chatProps: any) =>
          new ContactCard({
            ...chatProps,
            onClick: () => {
              window.store.set({activeChatAvatar: chatProps.avatar, activeChatTitle: chatProps.title, activeChatId: chatProps.id})
            },
        }),
      )
    }
    return true;
  }

  public render(): string {
    const {activeChatId, newMessage} = window.store.state
    const userId = window.store.state.user?.id;
    const { Chats } = this.children

    if(Array.isArray(Chats)) {
      Chats.forEach((item) => {
        item.setProps({isActive: item.props.id === activeChatId, isYou: newMessage?.user_id === userId
        })
      })
    }

    return `
      <div class="container__search">
        {{{ButtonLink}}}
        {{{InputSearch}}}
      </div>
      <div class="container__button-create">
        {{{ButtonCreateChat}}}
      </div>
      {{#unless chatsLength}}
        <p class="container__empty-list">{{#if isSearch}}Ничего не найдено{{else}}Пока нет созданных чатов{{/if}}</p>
      {{/unless}}
      <ul class="{{#if isScroll}}container__list{{else}}container__list-whithout-scroll{{/if}}">
        {{#each Chats}}
          {{{ this }}}
        {{/each}}
      </ul>
      {{#if isCreateChatModal}}
        {{{ModalWrapper}}}
        {{{CreateChatModal}}}
      {{/if}}
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isLoading: state.isLoading,
    chats: state.chats,
    chatsLength: state.chatsLength,
    isScroll: state.isScroll,
    isCreateChatModal: state.isCreateChatModal,
    activeChatId: state.activeChatId,
    coordinates: state.coordinates,
    isNewCount: state.isNewCount,
    limitChat: state.limitChat,
    offsetChat: state.offsetChat
  };
};

export default connect(mapStateToProps)(ContactList as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
