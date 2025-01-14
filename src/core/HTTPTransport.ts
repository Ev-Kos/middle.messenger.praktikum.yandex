import { baseApi } from "../utils/constants";

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

type TOptions = {
  timeout?: number;
  tries?: number;
  method?: string,
  data?: any;
  headers?: any;
}
//any?
type TRequest = (url: string,  options?: TOptions) => Promise<void | any>

function queryStringify(data: Record<string, any>) {
  if (typeof data !== 'object') {
    throw new Error('data не является объектом');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  private apiUrl: string;

  constructor(apiPath: string) {
    this.apiUrl = `${baseApi}${apiPath}`;
  }
  get:TRequest = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.GET}, options.timeout);
  };

  post:TRequest = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.POST}, options.timeout);
  };

  put:TRequest = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.PUT}, options.timeout);
  };

  patch:TRequest = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.PATCH}, options.timeout);
  };

  delete:TRequest = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.DELETE}, options.timeout);
  };

  private fetchWithRetry: TRequest = (url, options = {}) => {
    const { tries = 1 } = options;

    const onError = (err: Error) => {
      const triesLeft = tries - 1;
      if (!triesLeft) {
          throw err;
      }
      return this.fetchWithRetry(url, {...options, tries: triesLeft});
    };
    return fetch(url, options).catch(onError);
  };

  request = async (url: string, options: TOptions = {}, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise(function(resolve, reject) {
      if (!method) {
        reject('Нет такого метода');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.withCredentials = true;

      xhr.open(
        method,
        isGet && !!data
        ? `${url}${queryStringify(data)}`
        : url,
      );

      if (!(data instanceof FormData)) {
          xhr.setRequestHeader('Content-type', 'application/json');
      }

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      const jsonIsString = (str: string) => {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      };

      xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					const response = jsonIsString(xhr.response)
						? JSON.parse(xhr.response)
						: xhr.response;
					resolve(response);
				} else {
					const { error, reason } = JSON.parse(xhr.response);
					reject({
						error,
						reason,
					});
				}
			};

      xhr.onabort = reject;
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
      };

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    })
  }
}
