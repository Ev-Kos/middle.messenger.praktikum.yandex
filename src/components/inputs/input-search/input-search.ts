import Block from "../../../core/block";
import { LoupIcon } from "../../icons";

type TInputSearchProps = {
  modifier?: string;
  placeholderText: string;
  name: string;
  type: string;
  value?: string;
  onChange?: (e: Event) => void;
}

export default class InputSearch extends Block {
  constructor(props: TInputSearchProps) {
    super('label', {
      ...props,
      className: 'input-search__label',
      events: {
        change: props.onChange
      },
      LoupIcon: new LoupIcon
    })
  }

  public render(): string {
    return `
      <input class="input-search {{modifier}}" placeholder={{placeholderText}} name={{ name }} type={{ type }} value={{ value }} >
      <div class="input-search__icon-wrap">
        {{{LoupIcon}}}
      </div>
    `
  }
}
