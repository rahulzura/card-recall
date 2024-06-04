const { REACT_APP_API_URL: baseUrl } = process.env;

const request = async (method, { route, headers, body, query } = {}) => {
  const url = new URL(`${baseUrl}${route}`);
  if (query) {
    const searchParams = new URLSearchParams(query);
    url.searchParams(searchParams);
  }
  
  return fetch(url, {
    headers, body, method,
  });
};

const api = {
  async post(route, { headers, body } = {}) {
    return request('post', { route, headers, body });
  },
  async get(route, { headers, query } = {}) {
    return request('get', { route, headers, query });
  }
};

export const saveCard = async ({
  character,
  frame,
  keyword,
  topNote,
  middleNote,
  bottomNote 
}) => {
  const body = {
    character,
    frame,
    keyword,
    topNote,
    middleNote,
    bottomNote 
  };

  return api.post('/cards', { body });
};

export const getCards = async () => {
  const res = await api.get('/cards');
  const resData = await res.json();
  return resData.data ?? [];
};
