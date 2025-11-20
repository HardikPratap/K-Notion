// frontend/lib/api.ts
import axios, { AxiosInstance } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

function createAPI(token?: string): AxiosInstance {
  const instance = axios.create({
    baseURL: API_BASE,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: false,
  });

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return instance;
}

function getData(res: any) {
  return res.data?.data ?? res.data;
}
function parseError(err: any) {
  if (err?.response?.data) return err.response.data;
  return { success: false, message: err.message || "Unknown error" };
}

/**
 * Public API functions
 * - auth
 * - brains
 * - links
 * - notes
 * - share
 */
export const authAPI = {
  register: async (payload: { name: string; email: string; password: string }) => {
    try {
      const res = await createAPI().post("/auth/register", payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },

  login: async (payload: { email: string; password: string }) => {
    try {
      const res = await createAPI().post("/auth/login", payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },

  me: async (token: string) => {
    try {
      const res = await createAPI(token).get("/auth/me");
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  }
};

export const brainAPI = {
  create: async (token: string, payload: { title: string; description?: string; isPublic?: boolean; tags?: string[] }) => {
    try {
      const res = await createAPI(token).post("/brains", payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  listMine: async (token: string) => {
    try {
      const res = await createAPI(token).get("/brains/mine");
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  get: async (token: string, id: string) => {
    try {
      const res = await createAPI(token).get(`/brains/${id}`);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  togglePublic: async (token: string, id: string) => {
    try {
      const res = await createAPI(token).patch(`/brains/${id}/toggle-public`);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  delete: async (token: string, id: string) => {
    try {
      const res = await createAPI(token).delete(`/brains/${id}`);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  }
};

export const linkAPI = {
  add: async (token: string, payload: { url: string; brainId: string; title?: string; tags?: string[]; isPublic?: boolean }) => {
    try {
      const res = await createAPI(token).post("/links", payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  listByBrain: async (token: string, brainId: string) => {
    try {
      const res = await createAPI(token).get("/links", { params: { brainId } });
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  update: async (token: string, id: string, payload: any) => {
    try {
      const res = await createAPI(token).put(`/links/${id}`, payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  delete: async (token: string, id: string) => {
    try {
      const res = await createAPI(token).delete(`/links/${id}`);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  }
};

export const noteAPI = {
  add: async (token: string, payload: { content: string; title?: string; brainId: string; tags?: string[]; isPublic?: boolean }) => {
    try {
      const res = await createAPI(token).post("/notes", payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  listByBrain: async (token: string, brainId: string) => {
    try {
      const res = await createAPI(token).get("/notes", { params: { brainId } });
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  update: async (token: string, id: string, payload: any) => {
    try {
      const res = await createAPI(token).put(`/notes/${id}`, payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  delete: async (token: string, id: string) => {
    try {
      const res = await createAPI(token).delete(`/notes/${id}`);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  }
};

export const shareAPI = {
  create: async (token: string, payload: { itemType: "brain" | "link" | "note"; itemId: string; expiresAt?: string }) => {
    try {
      const res = await createAPI(token).post("/share/create", payload);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  },
  access: async (tokenOrUndefined: string | undefined, token: string) => {
    // public endpoint - tokenArg is share token
    try {
      const res = await createAPI().get(`/share/${token}`);
      return getData(res);
    } catch (err: any) {
      throw parseError(err);
    }
  }
};