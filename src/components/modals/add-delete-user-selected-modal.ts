import Block, { TBlockProps } from "../../core/block";
import { addUsersToChat, deleteUsersFromChat } from "../../services/chats";
import { usersSearch } from "../../services/users";
import { connect } from "../../utils/connect";
import { TUser } from "../../utils/types";
import { Button } from "../buttons/button";
import { InputForm } from "../inputs/input-form";
import { Loader } from "../loader";
import { UserCard } from "../user-card";

type TAddDeleteUserSelectedModal = {
  isClickAdd?: boolean,
  users: TUser[],
  partisipants: TUser[],
  selectedUsers: TUser[],
}

class AddDeleteUserSelectedModal extends Block {
  constructor(props: TAddDeleteUserSelectedModal) {
    super("form", {
      ...props,
      className: "form-modal",
      login: "",
      Input: new InputForm({
        name: "login",
        type: "text",
        text: "Логин",
        modifier: "select-user-input",
        onKeyDown: (e: KeyboardEvent) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;
          if(e.key === "Enter") {
            e.preventDefault();
            if(value.length !== 0) {
              usersSearch({login: value})
            }
          }
          if(e.key === "Backspace") {
            if(value.length === 1) {
              window.store.set({usersLength: null, isSearchUsers: false})
              this.setPropsForChildren(this.children.Input, {value: ""})
            }
          }
        }
      }),
      ButtonAdd: new Button({
        type: "submit",
        text: "Добавить",
        onClick: (e: Event) => {
          e.preventDefault();
          const arr = window.store.state.selectedUsers?.map((item) => item.id)
          if(arr && arr.length !== 0) {
            addUsersToChat({users: arr, chatId: Number(window.store.state.activeChatId)})
            this.setPropsForChildren(this.children.Input, {value: ""})
          }
        }
      }),
      ButtonDelete: new Button({
        type: "submit",
        text: "Удалить",
        onClick: (e: Event) => {
          e.preventDefault();
          const arr = window.store.state.selectedUsers?.map((item) => item.id)
          if(arr && arr.length !== 0) {
            deleteUsersFromChat({users: arr, chatId: Number(window.store.state.activeChatId)})
          }
        }
      }),
      Loader: new Loader({
        width: "100%",
        height: "100%",
        color: "#999"
      }),
      Users: props.users?.map(
        (userProps: TUser) =>
          new UserCard({
              ...userProps,
              isDeleted: false,
              onClick: () => {
                if(Array.isArray(window.store.state.selectedUsers)) {
                  window.store.set({
                    selectedUsers: [...window.store.state.selectedUsers, userProps],
                    usersLength: null,
                    isSelectedUsers: true
                  })
                  this.setPropsForChildren(this.children.Input, {value: ""})
                }
              },
          }),
      ),
      Partisipants: props.partisipants?.map((item: TUser) =>
        new UserCard({
          ...item,
          isDeleted: window.store.state.isClickAddUserModal ? false : true,
          onClick: () => {
            if(!window.store.state.isClickAddUserModal) {
              if(Array.isArray(window.store.state.partisipants)) {
                const id = window.store.state.user?.id;
                if(Array.isArray(window.store.state.selectedUsers)) {
                  if(item.id !== id) {
                    window.store.set({
                      selectedUsers: [...window.store.state.selectedUsers, item],
                      isSelectedUsers: true,
                      partisipants: window.store.state.partisipants?.filter((elem) => item.id !== elem.id)
                    })
                  }
                }
              }
            }
          }
        })
      ),
      SelectedUsers: props.selectedUsers?.map((item: TUser) =>
        new UserCard({
          ...item,
          isDeleted: false,
          onClick: () => {
            window.store.set({selectedUsers: window.store.state.selectedUsers?.filter((elem) => item.id !== elem.id)})
            if(window.store.state.selectedUsers?.length === 0) {
              window.store.set({isSelectedUsers: false})
            }
            if(!window.store.state.isClickAddUserModal && Array.isArray(window.store.state.partisipants)) {
              window.store.set({partisipants: [...window.store.state.partisipants, item]})
            }
          }
        })
      )
    });
  }

  componentDidUpdate(oldProps?: TBlockProps, newProps?: TBlockProps): boolean {
    if (oldProps === newProps) {
      return false;
    }
    if (newProps && newProps.users) {
      this.children.Users = newProps.users.map(
        (userProps: TUser) =>
          new UserCard({
            ...userProps,
            isDeleted: false,
            onClick: () => {
              if(Array.isArray(window.store.state.selectedUsers)) {
                window.store.set({selectedUsers: [...window.store.state.selectedUsers, userProps], usersLength: null, isSelectedUsers: true})
                this.setPropsForChildren(this.children.Input, {value: ""})
              }
            },
        }),
      )
    }
    if (newProps && newProps.partisipants) {
      this.children.Partisipants = newProps.partisipants.map((item: TUser) =>
        new UserCard({
          ...item,
          isDeleted: window.store.state.isClickAddUserModal ? false : true,
          onClick: () => {
            if(!window.store.state.isClickAddUserModal) {
              if(Array.isArray(window.store.state.partisipants)) {
                const id = window.store.state.user?.id;
                if(Array.isArray(window.store.state.selectedUsers)) {
                  if(item.id !== id) {
                    window.store.set({
                      selectedUsers: [...window.store.state.selectedUsers, item],
                      isSelectedUsers: true,
                      partisipants: window.store.state.partisipants?.filter((elem) => item.id !== elem.id)
                    })
                  }
                }
              }
            }
          }
        })
      )
    }
    if (newProps && newProps.selectedUsers) {
      this.children.SelectedUsers = newProps.selectedUsers?.map((item: TUser) =>
        new UserCard({
          ...item,
          isDeleted: true,
          onClick: () => {
            window.store.set({selectedUsers: window.store.state.selectedUsers?.filter((elem) => item.id !== elem.id)})
            if(window.store.state.selectedUsers?.length === 0) {
              window.store.set({isSelectedUsers: false})
            }
            if(!window.store.state.isClickAddUserModal && Array.isArray(window.store.state.partisipants)) {
              window.store.set({partisipants: [...window.store.state.partisipants, item]})
            }
          }
        })
      )
    }
    return true;
  }

  public render(): string {
    const id = window.store.state.user?.id;
    const { Partisipants } = this.children;

    if(Array.isArray(Partisipants)) {
      Partisipants.forEach((item) => {
        item.setProps({isYou: item.props.id === id})
      })
    }

    return `
      {{#if isClickAdd}}
        <h1 class="form-modal__title">Добавить пользователя</h1>
      {{else}}
        <h1 class="form-modal__title">Удалить пользователя</h1>
      {{/if}}
      <div class="form-modal__form">
        {{#if isClickAdd}}
          {{{Input}}}
        {{/if}}
        {{#if isLoaderAddUser}}
          <div class="loader-modal">
            {{{Loader}}}
          </div>
        {{/if}}
        {{#if isSearchUsers}}
          <p class="form-modal__empty-list">Никого не найдено</p>
        {{/if}}
        {{#if usersLength}}
          <ul class="{{#if isUserScroll}}search-list{{else}}search-list-without-scroll{{/if}}">
            {{#each Users}}
              {{{ this }}}
            {{/each}}
          </ul>
        {{/if}}
        <div class="select-list-container">
          <p class="text-for-del">Участники:</p>
          <ul class="select-list">
            {{#each Partisipants}}
              {{{ this }}}
            {{/each}}
          </ul>
          {{#if isSelectedUsers}}
            <p class="text-for-del">{{#if isClickAddUserModal}}Добавить:{{else}}Удалить:{{/if}}</p>
            <ul class="select-list">
              {{#each SelectedUsers}}
                {{{ this }}}
              {{/each}}
            </ul>
          {{/if}}
        <div/>
        <div class="form-modal__button">
          {{#if isClickAdd}}
            {{{ButtonAdd}}}
          {{else}}
            {{{ButtonDelete}}}
          {{/if}}
        </div>
      </div>
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isLoaderAddUser: state.isLoadingUserSearch,
    usersSearchError: state.usersSearchError,
    usersLength: state.usersLength,
    users: state.users,
    isUserScroll: state.isUserScroll,
    isSearchUsers: state.isSearchUsers,
    isClickAddUserModal: state.isClickAddUserModal,
    selectedUsers: state.selectedUsers,
    isSelectedUsers: state.isSelectedUsers,
    partisipants: state.partisipants
  };
};

export default connect(mapStateToProps)(AddDeleteUserSelectedModal as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
