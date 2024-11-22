import Block from "../../core/block";

type TLinkProps = {
  to: string;
  modifierLink: string;
  text: string;
};

export default class InputForm extends Block {
  constructor(props: TLinkProps) {
    super('a', {
      ...props,
      className: `link ${props.modifierLink}`,
      attrs: {
        href: props.to
      }
    })
  }
  public render(): string {
    return `
      {{text}}
    `;
  }
}
