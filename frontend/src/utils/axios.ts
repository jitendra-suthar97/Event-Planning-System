import axios, { AxiosError, type AxiosInstance } from "axios";
import { authStore } from "../stores/authStore";

const baseURL = import.meta.env.VITE_BASE_URL;

const token = localStorage.getItem("accessToken");

type MethodType = "get" | "post";

const headers = {
  contentType: "application/json",
  authorization: token,
};

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers,
});

export const callApi = async ({
  requestUrl,
  method,
  body,
}: {
  requestUrl: string;
  method: MethodType;
  body?: any;
}) => {
  try {
    const header1 = {
      contentType: "application/json",
      authorization: token,
    };

    const axiosInstance1 = axios.create({
      baseURL,
      headers: header1,
      withCredentials: true,
    });

    const response = await axiosInstance1[method](requestUrl, body);

    return response;
  } catch (error) {
    const err = error as AxiosError<any>;
    console.log("Api error: ", err);

    if (err.response?.data.authError) {
      try {
        const response = await axios.post<{ accessToken: string }>(
          `${baseURL}/auth/refreshToken`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        authStore.setState({ token: newAccessToken });
        localStorage.setItem("accessToken", newAccessToken);

        const header1 = {
          contentType: "application/json",
          authorization: newAccessToken,
        };

        const axiosInstance1 = axios.create({
          baseURL,
          headers: header1,
          withCredentials: true,
        });

        const res = await axiosInstance1[method](requestUrl, body);

        return res;
      } catch (error) {
        console.error("Refre token failed: ", error);
        localStorage.clear();
        throw error;
      }
    }
    return err;
  }
};
