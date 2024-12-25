import Block, {TBlockProps} from "../core/block";

export function withRouter<T extends TBlockProps>(WrappedBlock: new (props: T) => Block<T>) {
    return class extends WrappedBlock {
        constructor(props: T) {
            super({
                ...props,
                router: window.router,
            });
        }
    }
}
