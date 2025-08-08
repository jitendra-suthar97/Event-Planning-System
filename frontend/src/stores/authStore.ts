import { create } from "zustand";
import type { AxiosError } from "axios";
import { axiosInstance } from "../utils/axios";
import type { AuthStore } from "../types/User";

export const authStore = create<AuthStore>((set, get) => ({
  token: null,
  isLoading: false,
  error: null,

  signup: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("auth/register", data);
      const res = response.data;

      console.log("Sign up Res: ", res);

      return res;
    } catch (error) {
      console.log("Error while logging in: ", error);
      const err = error as AxiosError;
      const res = err.response?.data;
      return res;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("auth/login", data);
      const res = response.data;

      console.log("Login Res: ", res);

      set({ token: res.accessToken });
      return res;
    } catch (error) {
      console.log("Error while logging in: ", error);
      const err = error as AxiosError;
      const res = err.response?.data;
      return res;
    } finally {
      set({ isLoading: false });
    }
  },

  verifyEmail: async (code, id) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post(`auth/verifyEmail/${id}`, {
        code,
      });
      const res = response.data;

      console.log("Verification Res: ", res);

      return res;
    } catch (error) {
      console.log("Error while verifying email: ", error);
      const err = error as AxiosError;
      const res = err.response?.data;

      return res;
    } finally {
      set({ isLoading: false });
    }
  },

  resendCode: async (id) => {
    try {
      const response = await axiosInstance.post(`auth/resendCode/${id}`, {});
      const res = response.data;

      console.log("Resend res: ", res);

      return res;
    } catch (error) {
      console.log("Error while resending verification code: ", error);
      const err = error as AxiosError;
      const res = err.response?.data;

      return res;
    }
  },
  logout: async () => {},
}));
