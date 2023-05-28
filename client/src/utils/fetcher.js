import { API_URL } from "../const";
import { store } from "../state";

const fetcher = async (url, options) => {
  const token = store.getState().login.token;

  return await fetch(`${API_URL}/${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
  });
};

export default fetcher;
