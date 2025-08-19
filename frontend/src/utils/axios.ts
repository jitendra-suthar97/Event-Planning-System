import axios, { type AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("accessToken");

const headers = {
  contentType: "application/json",
  authorization: token,
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers,
});
