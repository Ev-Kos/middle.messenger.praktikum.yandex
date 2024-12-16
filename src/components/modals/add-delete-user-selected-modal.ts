import Block, { TBlockProps } from "../../core/block";
import { addUsersToChat } from "../../services/chats";
import { usersSearch } from "../../services/users";
import { connect } from "../../utils/connect";
import { keydownHandler } from "../../utils/keydown-handler";
import { TUser } from "../../utils/types";
import { checkLogin } from "../../utils/validate-inputs";
import { Button } from "../buttons/button";
import { InputForm } from "../inputs/input-form";
import { Loader } from "../loader";
import { LoginUserCard } from "../login-user-card";
import { TSelectedUsers } from "../login-user-card/login-user-card";
import { UserSearchCard } from "../user-search-card";

type TAddDeleteUserSelectedModal = {
  isClickAdd?: boolean,
  users: TUser[],
  selectedUsers: TSelectedUsers[],
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
          if(Array.isArray(arr) && arr.length !== 0) {
            addUsersToChat({users: arr, chatId: Number(window.store.state.activeChatId)})
            this.setPropsForChildren(this.children.Input, {value: ""})
          }
        }
      }),
      ButtonDelete: new Button({
        type: "submit",
        text: "Удалить",
        onClick: (e) => {
          e.preventDefault();
          const errorLogin = checkLogin(this.props.login);

          if (errorLogin.isError) {
            this.setPropsForChildren(this.children.Input, errorLogin);
            return;
          }
          console.log(this.props.login)
        }
      }),
      Loader: new Loader({
        width: "100%",
        height: "100%",
        color: "#999"
      }),
      Users: props.users?.map(
        (userProps: TUser) =>
          new UserSearchCard({
              ...userProps,
              onClick: () => {
                if(Array.isArray(window.store.state.selectedUsers))
                  window.store.set({selectedUsers: [...window.store.state.selectedUsers, {id: userProps.id, login: userProps.login}], usersLength: null, isSelectedUsers: true})
                  this.setPropsForChildren(this.children.Input, {value: ""})
              },
          }),
      ),
      Logins: props.selectedUsers?.map((item: TSelectedUsers) =>
        new LoginUserCard({
          ...item,
          onClick: () => {
            window.store.set({selectedUsers: window.store.state.selectedUsers?.filter((elem) => item.id !== elem.id)})
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
            new UserSearchCard({
              ...userProps,
              onClick: () => {
                if(Array.isArray(window.store.state.selectedUsers))
                  window.store.set({selectedUsers: [...window.store.state.selectedUsers, {id: userProps.id, login: userProps.login}], usersLength: null, isSelectedUsers: true})
                  this.setPropsForChildren(this.children.Input, {value: ""})
                  console.log(window.store.state.selectedUsers)
              },
          }),
        )
        if (newProps && newProps.selectedUsers) {
          console.log(newProps.selectedUsers)
          this.children.Logins = newProps.selectedUsers.map((item: TSelectedUsers) =>
            new LoginUserCard({
              ...item,
              onClick: () => {
                window.store.set({selectedUsers: window.store.state.selectedUsers?.filter((elem) => item.id !== elem.id)})
              }
            })
          )
        }
      }

      return true;
    }

  public render(): string {
    return `
      {{#if isClickAdd}}
        <h1 class="form-modal__title">Добавить пользователя</h1>
      {{else}}
        <h1 class="form-modal__title">Удалить пользователя</h1>
      {{/if}}
      <div class="form-modal__form">
        {{{Input}}}
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
        {{#if isSelectedUsers}}
          <ul class="select-list">
            {{#each Logins}}
              {{{ this }}}
            {{/each}}
          </ul>
        {{/if}}
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
    isSelectedUsers: state.isSelectedUsers
  };
};

export default connect(mapStateToProps)(AddDeleteUserSelectedModal as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
