import api from "./api";

export async function getAppointments() {
  const res = await api.get("/v1/appointments");
  return res.data.data.data;
}

export async function createAppointment(data) {
  const res = await api.post("/v1/appointments", data);
  return res.data.data.data;
}

export async function acceptAppointment(params, body) {
  const res = await api.patch(`/v1/appointments/${params}`, body);
  return res.data.data.data;
}
