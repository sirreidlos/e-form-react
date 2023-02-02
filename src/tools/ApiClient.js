import axios from "axios";
import LocalStorage from "./LocalStorage";

let instance = axios.create({
  baseURL: `http://127.255.255.1`,
});

instance.interceptors.request.use((config) => {
  const token = LocalStorage.getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

export default instance;
