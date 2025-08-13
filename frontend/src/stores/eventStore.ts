import type { EventStore } from "../types/Event";
import { create } from "zustand";

export const eventStore = create<EventStore>((set, get) => ({
  events: [],
  currentEvent: null,
  loading: false,
  createEvent: async (data) => {
    console.log("Event data: ", data);
  },
  getEventById: async (id) => {
    console.log("Get Event id: ", id);
  },
  clearCurrentEvent: () => {
    set({ currentEvent: null });
  },
  deleteEvent: async (id) => {
    console.log("Event to delete: ", id);
  },
  getEventsByUserId: async (id) => {
    console.log("User: ", id);
  },
}));
