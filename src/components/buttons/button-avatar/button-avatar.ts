import Block, { TBlockProps } from "../../../core/block";
import { connect } from "../../../utils/connect";
import { ImageIcon } from "../../icons";
import Button from "../button/button";

type TButtonAvatarProps = {
  onClick?: () => void;
  text: string;
  onChange?: (e: Event) => void;
  deleteAvatar?: () => void;
  isCreateChat: boolean;
}

class ButtonAvatar extends Block {
  constructor(props: TButtonAvatarProps) {
    super("button", {
      ...props,
      className: "button-avatar",
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick,
        change: props.onChange
      },
      ImageIcon: new ImageIcon({
        width: "40",
        height: "40",
        color: "#CDCDCD"
      }),
      DeleteAvatar: new Button({
        text: "Удалить аватар",
        type: "button",
        onClick: props.deleteAvatar,
        modifierButton: "button-image-avatar",
        modifierText: "button-avatar__text"

      })
    });
  }

  public render(): string {
    return `
      {{#if isCreateChat}}
        {{#if chatAvatar}}
          <img class="button-avatar__image" src={{chatAvatar.src}} alt={{chatAvatar.alt}}>
          <div class="button-avatar__image-mask">
            {{{DeleteAvatar}}}
          </div>
        {{else}}
          <div class="button-avatar__mask">
            <input class="button-avatar__input-file" type="file" name="input-file" value={{ value }}/>
            <p class="button-avatar__text">{{text}}</p>
          </div>
          {{{ImageIcon}}}
        {{/if}}
        {{else}}
          {{#if userAvatar}}
            <img class="button-avatar__image" src={{userAvatar}} alt="Фотография пользователя">
            <div class="button-avatar__image-mask">
              {{{DeleteAvatar}}}
            </div>
          {{else}}
          <div class="button-avatar__mask">
            <p class="button-avatar__text">{{text}}</p>
          </div>
          {{{ImageIcon}}}
        {{/if}}
      {{/if}}

    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    chatAvatar: state.chatAvatar,
    //@ts-ignore
    userAvatar: state.user?.avatar,
  };
};

export default connect(mapStateToProps)(ButtonAvatar as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
