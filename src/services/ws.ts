import { wsApi } from "../utils/constants";

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
			if (Array.isArray(messages)) {
        const storeMessages = window.store.state.messages;
				const filter = messages.filter((item) => item.type === "message" || item.type === "file");

				if(storeMessages && storeMessages.some((item) => filter.findIndex((elem) => item.id === elem.id) !== -1)) {
          return;
        }
        if(Array.isArray(storeMessages)) {
          const arr = [...storeMessages, ...messages]
          window.store.set({ messages: arr });
        }
			} else {
				if (messages.type === "message" || messages.type === "file") {
          const {chats, partisipants, activeChatId} = window.store.state
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
            if(window.store.state.messages) {
              window.store.set({ messages: [...window.store.state.messages, messages], newMessage: messages, chats: newChats });
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
