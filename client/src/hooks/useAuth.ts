import useSWR from "swr";
import { authAPI } from "../api/api";
import { getToken } from "../utils/storage";

export function useAuth() {
  const token = getToken();
  const { data, error, mutate } = useSWR(token ? ["me", token] : null, async () => {
    if (!token) return null;
    return await authAPI.me(token);
  }, { revalidateOnFocus: false });

  return { user: data ?? null, loading: !error && !data, error, mutate, token };
}