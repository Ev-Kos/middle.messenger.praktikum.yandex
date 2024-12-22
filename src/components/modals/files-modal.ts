import Block from "../../core/block";
import { FileIcon, ImageIcon, LocationIcon } from "../icons";

type TButtonProps = {
  text: string;
  isPhoto?: boolean;
  isFile?: boolean;
  isLocation?: boolean;
  onClick: () => void;
  isCanUse?: boolean;
}

class Button extends Block {
  constructor(props: TButtonProps) {
    super('button', {
      ...props,
      className: props.isCanUse ? "chat-modal-file__button" : "chat-modal-file__button-locked",
      events: {
        click: props.onClick
      },
      attrs: {
        type: "button"
      },
      ImageIcon: new ImageIcon({
        width: "22",
        height: "22",
        color: "#3369F3"
      }),
      FileIcon: new FileIcon,
      LocationIcon: new LocationIcon
    })
  }

  public render(): string {
    return `
      {{#if isPhoto}}
        {{{ImageIcon}}}
      {{/if}}
      {{#if isFile}}
        {{{FileIcon}}}
      {{/if}}
      {{#if isLocation}}
        {{{LocationIcon}}}
      {{/if}}
      <p class="chat-modal__text">{{text}}</p>
    `
  }
}

export default class FilesModal extends Block {
  constructor() {
    super('form', {
      className: "chat-modal-file",
      ButtonPhoto: new Button({
        text: "Фото",
        isPhoto: true,
        isCanUse: true,
        onClick: () => {window.store.set({isClickFileLoad: true, isOpenFileModal: false, isMessagePhoto: true})}
      }),
      ButtonFile: new Button({
        text: "Файл",
        isFile: true,
        onClick: () => {}
      }),
      ButtonLocation: new Button({
        text: "Локация",
        isLocation: true,
        onClick: () => {}
      })
    })
  }

  public render(): string {
    return `
      {{{ButtonPhoto}}}
      {{{ButtonFile}}}
      {{{ButtonLocation}}}
    `
  }
}
