import Block, { TBlockProps } from "../core/block";
import { StoreEvents } from "../core/store";
import { store } from "./constants";
import isEqual from "./functions/isEqual";

type Indexed<T = any> = {
  [key in string]: T;
}

// export type Indexed<T = unknown> = {
//   [key: string]: Indexed<T> | T;
// };

export function connect(mapStateToProps) {
	return function (Component: typeof Block) {
		return class extends Component {
			private onChangeStoreCallback: () => void;
			constructor(props) {
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
					}

					// не забываем сохранить новое состояние
					state = newState;
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
