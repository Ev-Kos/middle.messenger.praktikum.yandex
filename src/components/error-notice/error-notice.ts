import Block from "../../core/block";

type TErrorNoticeProps = {
  error: string;
};
export default class TErrorNotice extends Block {
  constructor(props: TErrorNoticeProps) {
    super("div", {
      error: props.error,
      className: "error"
      }
    );
  }
  public render(): string {
    return `
      <span>{{error}}</span>
    `;
  }
}
