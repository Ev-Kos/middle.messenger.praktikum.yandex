import Block from "../../core/block";

export default class ArrowIcon extends Block {
  constructor() {
    super("div", {
      className: "arrow-icon"
    });
  }
  public render(): string {
    return `
      <svg
      fill="#ffffff"
      width="11px" height="11px"
      viewBox="0 0 1920 1920">
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0">
      </g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round">
      </g>
      <g
        id="SVGRepo_iconCarrier">
        <path
          d="M629.228 331.011 0 960.239l629.228 629.228 155.901-155.901-363.071-363.071h1497.931V849.984H422.058l363.071-363.072z"
          fill-rule="evenodd">
        </path>
      </g>
    </svg>
    `
  }
}
