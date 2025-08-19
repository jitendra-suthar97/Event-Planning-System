import type { AxiosError } from "axios";
import { create } from "zustand";
import type { VenueStore } from "../types/Venue.ts";

export const venueStore = create<VenueStore>((set, get) => ({
  venues: [],
  currentVenue: null,
  loading: false,
  addVenue: async (data) => {
    console.log("Venue data: ", data);
  },
  getVenueById: async (id) => {
    console.log("Get venue: ", id);
  },
  clearCurrentVenue: () => {},
  deleteVenue: async (id) => {
    console.log("Delete venue: ", id);
  },
}));
