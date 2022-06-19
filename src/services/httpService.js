import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 10000,
});

export async function read(url) {
  const { data } = await api.get(url);
  return data;
}
