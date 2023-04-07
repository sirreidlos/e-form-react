import axios from "axios";
import LocalStorage from "./LocalStorage";

let instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
});

instance.interceptors.request.use((config) => {
  const token = LocalStorage.getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : undefined;

  return config;
});

export default instance;
