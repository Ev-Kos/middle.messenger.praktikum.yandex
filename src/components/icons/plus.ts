import Block from "../../core/block"

type TProps = {
  color: string,
  width: string;
  height: string;
}

export default class PlusIcon extends Block {
  constructor(props: TProps) {
    super("div", {
      ...props,
      className: "plus-icon"
    });
  }

  public render(): string {
    return `
      <svg
        width={{width}}
        height={{height}}
        viewBox="0 0 12 12"
        fill="none"
      >
        <line
          x1="5.99988"
          y1="0.5"
          x2="5.99988"
          y2="11.5"
          stroke={{color}}
          stroke-width="1.5"
        />
        <line
          x1="0.499878"
          y1="6"
          x2="11.4999"
          y2="6"
          stroke={{color}}
          stroke-width="1.5"
        />
      </svg>
    `
  }
}
