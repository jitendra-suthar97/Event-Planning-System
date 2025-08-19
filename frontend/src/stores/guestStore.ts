import type { AxiosError } from "axios";
import type { GuestState } from "../types/Guest";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const rsvpStore = create<GuestState>((set, get) => ({
  guests: [],
  loading: false,
  getGuestsByEventId: async (id) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get(
        `/guest/get-guests-by-event-id/${id}`
      );

      set({ guests: response.data.guests });
    } catch (error) {
      console.log("Error while getting guests: ", error as AxiosError);
    } finally {
      set({ loading: false });
    }
  },
  addGuest: async (data) => {
    try {
      const response = await axiosInstance.post("/guest/add-guest", data);
      const res = response.data;

      const { newGuest } = res;

      set((state) => ({
        guests: [...state.guests, newGuest],
      }));
      return res;
    } catch (error) {
      console.log("Error while adding guest: ", error as AxiosError);
    }
  },
  deleteGuest: async (id) => {
    try {
      const response = await axiosInstance.post(
        `/guest/delete-guest/${id}`,
        {}
      );

      set((state) => ({
        guests: state.guests.filter((guest) => guest._id !== id),
      }));
      const res = response.data;
      return res;
    } catch (error) {
      console.log("Error while deleting guest: ", error as AxiosError);
    }
  },
}));
