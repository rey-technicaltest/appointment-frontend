import api from "./api";

export async function getUsers() {
  const res = await api.get("/v1/users");
  return res.data.data.result;
}

export async function updateProfile(data) {
  const res = await api.put("/v1/users", data);
  return res.data.data.result;
}

export async function getProfile() {
  const res = await api.get("/v1/profile");
  return res.data.data.result;
}
