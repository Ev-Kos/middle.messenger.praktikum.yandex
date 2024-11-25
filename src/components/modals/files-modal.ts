import Block from "../../core/block";
import { FileIcon, ImageIcon, LocationIcon } from "../icons";

export default class FilesModal extends Block {
  constructor() {
    super('form', {
      className: "chat-modal-file",
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
      <div class="chat-modal__field">
        {{{ImageIcon}}}
        <p class="chat-modal__text">Фото или Видео</p>
      </div>
      <div class="chat-modal__field">
        {{{FileIcon}}}
        <p class="chat-modal__text">Файл</p>
      </div>
      <div class="chat-modal__field">
        {{{LocationIcon}}}
        <p class="chat-modal__text">Локация</p>
      </div>
    `
  }
}
