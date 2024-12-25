import Block from "../../core/block";

type TLoaderIconProps = {
  width: string;
  height: string;
  color: string;
}

export default class LoaderIcon extends Block {
  constructor(props: TLoaderIconProps) {
    super("div", {
      ...props,
      className: "loader-icon",
    })
  }

  public render(): string {
    return `
      <svg
        width={{width}}
        height={{height}}
        viewBox="0 0 24 24"
        fill="none"
        stroke={{color}}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M21 12a9 9 0 11-6.219-8.56"/> </g>
      </svg>
    `
  }
}
