import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EventStore } from "../types/Event";
import type { AxiosError } from "axios";
import { axiosInstance } from "../utils/axios";

export const eventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: [],
      currentEvent: null,
      loading: false,
      setCurrentEvent: (data) => set({ currentEvent: data }),

      clearCurrentEvent: () => set({ currentEvent: null }),

      createEvent: async (data) => {
        try {
          const response = await axiosInstance.post(
            "/event/create-event",
            data
          );
          return response.data;
        } catch (error) {
          console.log("Error while creating event: ", error as AxiosError);
        }
      },

      getEventsByUserId: async () => {
        set({ loading: true });
        try {
          const response = await axiosInstance.get(
            "/event/get-events-by-userId"
          );
          set({ events: response.data.events });
        } catch (error) {
          console.log("Error while fetching events: ", error as AxiosError);
        } finally {
          set({ loading: false });
        }
      },

      editEvent: async (id, data) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.post(
            `/event/edit-event/${id}`,
            data
          );

          const res = response.data;
          set((state) => ({
            events: state.events.map((event) =>
              event._id === res.updatedEvent._id ? res.updatedEvent : event
            ),
          }));

          return res;
        } catch (error) {
          console.log("Error while fetching events: ", error as AxiosError);
        } finally {
          set({ loading: false });
        }
      },

      deleteEvent: async (id) => {
        try {
          const response = await axiosInstance.post(
            `/event/delete-event/${id}`,
            {}
          );

          set((state) => ({
            events: state.events.filter((event) => event._id !== id),
          }));

          const res = response.data;
          return res;
        } catch (error) {
          const err = error as AxiosError;
          console.log("Error while fetching events: ", err);
          const res = err.response?.data;
          return res;
        }
      },
    }),
    {
      name: "event-storage",
      partialize: (state) => ({
        currentEvent: state.currentEvent,
      }),
    }
  )
);
