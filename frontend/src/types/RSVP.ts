export interface RSVP {
  id: string;
  eventId: string;
  guestName: string;
  guestEmail: string;
  status: "pending" | "accepted" | "declined";
  notes?: string;
}

export interface RSVPFormData {
  guestName: string;
  guestEmail: string;
  status: "accepted" | "declined";
  notes?: string;
}

export interface RSVPState {
  rsvps: RSVP[];
  currentRSVP: RSVP | null;
  rsvpStats: {
    total: number;
    accepted: number;
    declined: number;
    pending: number;
  } | null;
  loading: boolean;

  clearCurrentRSVP: () => void;
  getRSVPsByEventId: (eventId: string) => Promise<void>;
  getRSVPByEmailAndEvent: (email: string, eventId: string) => Promise<void>;
  submitRSVP: (eventId: string, rsvpData: RSVPFormData) => Promise<any>;
  deleteRSVP: (id: string) => Promise<void>;
  getRSVPStats: (eventId: string) => Promise<void>;
}
