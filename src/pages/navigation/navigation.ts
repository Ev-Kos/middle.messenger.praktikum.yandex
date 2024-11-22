import Block from "../../core/block";

export default class NavigationPage extends Block {
  constructor() {
    super('section', {
      className: 'navigation-page',
    })
  }
  public render(): string {
    return `
      <nav class="nav">
        <ul class="nav__list">
          <li><a href="#" class="nav__link" page="login">Авторизация</a></li>
          <li><a href="#" class="nav__link" page="registration">Регистрация</a></li>
          <li><a href="#" class="nav__link" page="chat">Чат</a></li>
          <li><a href="#" class="nav__link" page="profile">Профиль</a></li>
          <li><a href="#" class="nav__link" page="500">500</a></li>
          <li><a href="#" class="nav__link" page="400">400</a></li>
        </ul>
      </nav>
    `
  }
}
