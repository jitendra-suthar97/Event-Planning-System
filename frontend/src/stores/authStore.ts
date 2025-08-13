import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AxiosError } from "axios";
import { axiosInstance, callApi } from "../utils/axios";
import type { AuthStore } from "../types/User";

export const authStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      isLoading: false,
      loggedInUser: null,

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
          const response = await axiosInstance.post(
            `auth/resendCode/${id}`,
            {}
          );
          const res = response.data;

          console.log("Resend res: ", res);

          return res;
        } catch (error) {
          const err = error as AxiosError;
          console.log("Error while resending verification code: ", err);
          const res = err.response?.data;

          return res;
        }
      },

      logout: async () => {},

      getLoggedInUser: async () => {
        try {
          const response: any = await callApi({
            requestUrl: "/auth/getLoggedInUser",
            method: "get",
          });
          // const response = await axiosInstance.get("/auth/getLoggedInUser");

          console.log("Response: ", response.data?.user);
          const user = response.data?.user;
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
