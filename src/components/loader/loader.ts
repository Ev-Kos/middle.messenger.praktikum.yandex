import Block from "../../core/block";
import { LoaderIcon } from "../icons";

type TLoaderProps = {
  width: string,
  height: string,
  color: string,
}

export default class Loader extends Block {
  constructor(props: TLoaderProps) {
    super('div', {
      ...props,
      className: 'loader',
      LoaderIcon: new LoaderIcon({
        width: props.width,
        height: props.height,
        color: props.color
      })
    });
  }

  public render(): string {
    return `
      <div class="loader__animation">
        {{{LoaderIcon}}}
      <div>
    `
  }
}
