const _baseURL = Symbol();

class BaseURL {
  [_baseURL] = () => {
    return `http://localhost:3001`;
  };
}

const api = new BaseURL();
export const baseURL = api[_baseURL]();
