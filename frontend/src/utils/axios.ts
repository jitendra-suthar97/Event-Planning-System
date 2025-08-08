import axios, { type AxiosInstance } from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
