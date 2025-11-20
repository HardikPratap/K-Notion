export const TOKEN_KEY = "sb_token";
export const setToken = (t: string) => { localStorage.setItem(TOKEN_KEY, t); };
export const getToken = () => typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);