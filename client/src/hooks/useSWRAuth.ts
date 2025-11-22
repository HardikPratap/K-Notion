// src/hooks/useSWRAuth.ts
import useSWR from "swr";
import { authAPI } from "../api/api";
import { getToken, removeToken } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export function useSWRAuth() {
  const token = getToken();
  const navigate = useNavigate();

  const fetcher = async () => {
    if (!token) return null;
    try {
      const user = await authAPI.me(token);
      return user;
    } catch (err: any) {
      // token invalid or expired — remove token and redirect to login
      removeToken();
      navigate("/login");
      return null;
    }
  };

  const { data, error, isLoading, mutate } = useSWR(token ? ["auth", token] : null, fetcher, {
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const signOut = useCallback(() => {
    removeToken();
    mutate(null, false);
    navigate("/login");
  }, [mutate, navigate]);

  return {
    user: data ?? null,
    loading: isLoading,
    error,
    token,
    mutate,
    signOut
  };
}