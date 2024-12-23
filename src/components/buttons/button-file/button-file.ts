import Block, { TBlockProps } from "../../../core/block";
import { connect } from "../../../utils/connect";
import { PaperClipIcon } from "../../icons";

type TButtonFile = {
  onClick?: () => void;
  onMouseEnter?: () => void;
}

class ButtonFile extends Block {
  constructor(props: TButtonFile) {
    super('button', {
      ...props,
      className: 'button-file',
      attrs: {
        type: "button"
      },
      events: {
        click: props.onClick,
        mouseenter: props.onMouseEnter
      },
      PaperClipIcon: new PaperClipIcon
    })
  }

  public render(): string {
    return `
      {{#if uploadedMessagePhoto}}
        <img class="button-file__image" src={{getImage uploadedMessagePhoto.path}} alt="Загруженное изображение">
        {{else}}
        {{{PaperClipIcon}}}
      {{/if}}
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    uploadedMessagePhoto: state.uploadedMessagePhoto,
  };
};

export default connect(mapStateToProps)(ButtonFile as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
