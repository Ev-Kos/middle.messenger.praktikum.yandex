import Block, { TBlockProps } from "../core/block";
import { StoreEvents } from "../core/store";
import isEqual from "./functions/isEqual";

export function connect<T extends TBlockProps>(mapStateToProps: (state: any) => T) {
	return function (Component: new (props: TBlockProps) => Block<TBlockProps>) {
		return class extends Component {
			private onChangeStoreCallback: () => void;
			constructor(props: TBlockProps) {
				const store = window.store;
				// сохраняем начальное состояние
				let state = mapStateToProps(store.getState());

				super({ ...props, ...state });

				this.onChangeStoreCallback = () => {
					// при обновлении получаем новое состояние
					const newState = mapStateToProps(store.getState());

					// если что-то из используемых данных поменялось, обновляем компонент
					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
            console.log(newState, 'isEqual')
					}

					// не забываем сохранить новое состояние
					state = newState;
          console.log(state, 'state')
				};

				// подписываемся на событие
				store.on(StoreEvents.Updated, this.onChangeStoreCallback);
			}

			dispatchComponentDidUnmount() {
				super.dispatchComponentDidUnmount();
				window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
			}
		};
	};
}
