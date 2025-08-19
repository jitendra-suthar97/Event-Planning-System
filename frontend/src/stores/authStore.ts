import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AxiosError } from "axios";
import { axiosInstance } from "../utils/axios";
import type { AuthStore } from "../types/User";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAdmin: false,
      token: null,
      isLoading: false,
      loggedInUser: null,

      signup: async (data) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post("auth/register", data);
          const res = response.data;

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
          const response = await axiosInstance.post(
            `auth/resendCode/${id}`,
            {}
          );
          const res = response.data;

          return res;
        } catch (error) {
          const err = error as AxiosError;
          console.log("Error while resending verification code: ", err);
          const res = err.response?.data;

          return res;
        }
      },

      logout: async () => {
        try {
          const response = await axios.post(`${baseURL}auth/logout`);

          const res = response.data;
          set({
            token: null,
            loggedInUser: null,
          });
          return res;
        } catch (error) {
          const err = error as AxiosError;
          console.log("Error while getting loggedin user: ", err.response);
        }
      },

      getLoggedInUser: async () => {
        try {
          const response = await axiosInstance.get("/auth/getLoggedInUser");
          const user = response.data?.user;
          get().isAdmin = user.isAdmin;

          set({ loggedInUser: user });
        } catch (error) {
          const err = error as AxiosError;
          console.log("Error while getting loggedin user: ", err);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        loggedInUser: state.loggedInUser,
      }),
    }
  )
);
