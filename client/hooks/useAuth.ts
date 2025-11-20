// hooks/useAuth.ts
import useSWR from "swr";
import { authAPI } from "../lib/api";

const fetcher = async (token?: string) => {
  if (!token) return null;
  const res = await authAPI.me(token);
  return res;
};

export function useAuth(token?: string | null) {
  // token management: in this simple flow we expect token from localStorage
  const { data, error, mutate } = useSWR(token ? ["me", token] : null, () => fetcher(token || undefined), {
    revalidateOnFocus: false,
  });

  return {
    user: data ?? null,
    loading: !error && !data,
    error,
    mutate
  };
}