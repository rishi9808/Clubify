import { API_URL } from "../const";
import { store } from "../state";


const fetcher = async (url, options) => {
    const token = store.getState().auth.token;
    const res = await fetch(`${API_URL}/${url}`, {
        ...options,
        headers: {
            "Content-type": "application/json",
            ...options?.headers,
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    });
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res.json();
}

export default fetcher;