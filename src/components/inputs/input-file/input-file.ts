import Block from "../../../core/block";

type TInputFileProps = {
  value?: string;
  onChange: (e: Event) => void;
}

export default class InputFile extends Block {
  constructor(props: TInputFileProps) {
    super("label", {
      ...props,
      className: "input-file__label"
    });
  }

  public render(): string {
    return `
      <input class="input-file" type="file" name="input-file" value={{ value }}/>
      <p class="input-file__text">Выбрать файл на компьютере</p>
    `
  }
}
