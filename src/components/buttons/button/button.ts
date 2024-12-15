import Block, { TBlockProps } from "../../../core/block";
import { connect } from "../../../utils/connect";
import { Loader } from "../../loader";

type TButtonProps = {
  modifier?: string;
  type: string;
  text: string;
  modifierText?: string;
  modifierButton?: string;
  onClick?: (e: Event) => void;
  isLoading?: boolean;
};

class Button extends Block {
  constructor(props: TButtonProps) {
    super('button', {
      ...props,
      className: props.modifierButton ? `button ${props.modifierButton}` : "button",
      attrs: {
        type: "button",
      },
      events: {
        click: props.onClick,
      },
      Loader: new Loader({
        width: "100%",
        height: "100%",
        color: "#fff"
      })
    })
  }

  public render(): string {
    return `
      {{#if isLoading}}
        {{{Loader}}}
      {{else}}
        <span class="button__text {{modifierText}}">{{text}}</span>
      {{/if}}
    `
  }
}

const mapStateToProps = (state: {[key: string]: unknown}) => {
  return {
    isLoading: state.isLoadingChangeChats,
  };
};

export default connect(mapStateToProps)(Button as unknown as new (newProps: TBlockProps) => Block<TBlockProps>);
