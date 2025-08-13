import type { RSVPState } from "src/types/RSVP";
import { create } from "zustand";

export const rsvpStore = create<RSVPState>((set, get) => ({
  rsvps: [],
  currentRSVP: null,
  rsvpStats: null,
  loading: false,
  clearCurrentRSVP: () => {
    set({ currentRSVP: null });
  },
  getRSVPsByEventId: async (eventId) => {
    console.log("EventId: ", eventId);
  },
  getRSVPByEmailAndEvent: async (email, eventId) => {
    console.log("Email, eventId: ", email, eventId);
    console.log("EventId: ", eventId);
  },
  deleteRSVP: async (id) => {
    console.log("Delete rsvp: ", id);
  },
  getRSVPStats: async (eventId) => {
    console.log("EventId: ", eventId);
  },
  submitRSVP: async (eventId, rsvpData) => {
    console.log("RSVP data: ", rsvpData);
  },
}));
