// src/api/api.ts
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001/api/v1";

function api(token?: string) {
  const inst = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
  });
  if (token) inst.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return inst;
}

function parseData(res: any) { return res.data?.data ?? res.data; }
function parseError(err: any) { throw err.response?.data ?? { success: false, message: err.message }; }

export const authAPI = {
  register: async (payload: { name: string; email: string; password: string }) => {
    try { const r = await api().post("/auth/register", payload); return parseData(r); } catch (e) { parseError(e); }
  },
  login: async (payload: { email: string; password: string }) => {
    try { const r = await api().post("/auth/login", payload); return parseData(r); } catch (e) { parseError(e); }
  },
  me: async (token: string) => { try { const r = await api(token).get("/auth/me"); return parseData(r); } catch (e) { parseError(e); } }
};

export const brainAPI = {
  create: async (token: string, payload: any) => { try { const r = await api(token).post("/brains", payload); return parseData(r); } catch (e) { parseError(e); } },
  listMine: async (token: string) => { try { const r = await api(token).get("/brains/mine"); return parseData(r); } catch (e) { parseError(e); } },
  get: async (token: string, id: string) => { try { const r = await api(token).get(`/brains/${id}`); return parseData(r); } catch (e) { parseError(e); } },
  toggle: async (token: string, id: string) => { try { const r = await api(token).patch(`/brains/${id}/toggle-public`); return parseData(r); } catch (e) { parseError(e); } },
  delete: async (token: string, id: string) => { try { const r = await api(token).delete(`/brains/${id}`); return parseData(r); } catch (e) { parseError(e); } }
};

export const linkAPI = {
  add: async (token: string, payload: any) => { try { const r = await api(token).post("/links", payload); return parseData(r); } catch (e) { parseError(e); } },
  listByBrain: async (token: string, brainId: string) => { try { const r = await api(token).get("/links", { params: { brainId } }); return parseData(r); } catch (e) { parseError(e); } },
  update: async (token: string, id: string, payload: any) => { try { const r = await api(token).put(`/links/${id}`, payload); return parseData(r); } catch (e) { parseError(e); } },
  delete: async (token: string, id: string) => { try { const r = await api(token).delete(`/links/${id}`); return parseData(r); } catch (e) { parseError(e); } }
};

export const noteAPI = {
  add: async (token: string, payload: any) => { try { const r = await api(token).post("/notes", payload); return parseData(r); } catch (e) { parseError(e); } },
  listByBrain: async (token: string, brainId: string) => { try { const r = await api(token).get("/notes", { params: { brainId } }); return parseData(r); } catch (e) { parseError(e); } },
  update: async (token: string, id: string, payload: any) => { try { const r = await api(token).put(`/notes/${id}`, payload); return parseData(r); } catch (e) { parseError(e); } },
  delete: async (token: string, id: string) => { try { const r = await api(token).delete(`/notes/${id}`); return parseData(r); } catch (e) { parseError(e); } }
};

export const shareAPI = {
  create: async (token: string, payload: any) => { try { const r = await api(token).post("/share/create", payload); return parseData(r); } catch (e) { parseError(e); } },
  access: async (tokenStr: string) => { try { const r = await api().get(`/share/${tokenStr}`); return parseData(r); } catch (e) { parseError(e); } }
};

export const aiAPI = {
  summarize: async (token: string, payload: any) => { try { const r = await api(token).post("/ai/summarize", payload); return parseData(r); } catch (e) { parseError(e); } }
};