import api from "./api";

export async function login(username, password) {
  const res = await api.post("/v1/auth", { username, password });
  return res.data;
}
