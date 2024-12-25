import { wsApi } from "../utils/constants";
import isEqual from "../utils/functions/isEqual";

export type WSChatOptions = {
	user_id: number;
	chat_id: number;
	token_value: string;
	content: string;
};

export default class WebScoketClass {
  public apiUrl: string;
  public socket: WebSocket | any;
  public content: string = "0";
	constructor(options: WSChatOptions) {
		const {user_id, chat_id, token_value, content} = options;
		this.apiUrl = `${wsApi}${user_id}/${chat_id}/${token_value}`;
    this.content = content;
	}

	public connect(): void {
		this.socket = new WebSocket(this.apiUrl);
		this.socket.onopen = () => {
      const stateWs = this.getState()
			if (stateWs !== 1) {
        return
      }
			this.getOldMessages('0')
		}

		this.socket.onmessage = (event: MessageEvent) => {
			const messages = JSON.parse(event.data);
      const activeChatId = window.store.state.activeChatId
			if (Array.isArray(messages)) {
        if(messages.length > 0) {
          const storeMessages = window.store.state.messagesArr;
          const filter = messages.filter((item) => item.type === "message" || item.type === "file");

          if(storeMessages) {
            if(isEqual(storeMessages, filter)) {
              return
            }
          }
          window.store.set({ messagesArr: filter });
        } else {
          window.store.set({ messagesArr: [] });
        }
			} else {
				if (messages.type === "message" || messages.type === "file") {
          const {chats, partisipants} = window.store.state
          const user = partisipants?.find((item) => item.id === messages.user_id)
          const newChats = chats?.map((item) => item.id === activeChatId
            ? {...item,
              last_message: {
                user: {
                  first_name: user?.first_name,
                  second_name: user?.second_name,
                  display_name: user?.display_name,
                  login: user?.login
                },
                time: messages.time,
                content: messages.type === "file" ? "Изображение" : messages.content,
              }}
            : item)
            if(window.store.state.messagesArr) {
              window.store.set({ messagesArr: [...window.store.state.messagesArr, messages], newMessage: messages, chats: newChats });
            }
				}
			}
		}

		this.socket.onclose = (event: CloseEvent) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Проверьте соединение с интернетом");
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      this.socket.close()
		}

    this.socket.onerror = (event: ErrorEvent) => {
			console.log("Ошибка", event.message);
      this._reconnect()
		};
	}

  public close = () => {
    this.socket.close();
  }

  private _reconnect() {
      const interval = 5000;
      console.log("Попытка переподключения");
      setTimeout(() => {
          this.socket.connect()
      }, interval);
  }

  public getOldMessages(content: string) {
    this.socket.send(JSON.stringify({
        content: content,
        type: 'get old',
    }))
  }

  public sendMessage(message: string): void {
    this.socket.send(JSON.stringify({
        content: message,
        type: "message",
    }))
  }

  public sendFile(file: string) {
    this.socket.send(JSON.stringify({
        content: file,
        type: "file",
    }))
  }

  public sendSticker(sticker: string) {
    this.socket.send(JSON.stringify({
        content: sticker,
        type: "sticker",
    }))
  }

	public ping() {
		this.socket.send(
			JSON.stringify({
				content: "",
				type: "ping",
			})
		);
	}

	public getState() {
		return this.socket.readyState;
	}

	public getSocket() {
		return this.socket;
	}
}
