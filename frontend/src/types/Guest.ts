export interface Guest {
  _id: string;
  eventId: string;
  guestName: string;
  guestEmail: string;
  rsvpStatus: "pending" | "accepted" | "declined";
}

export interface GuestFormData {
  eventId: string;
  guestName: string;
  guestEmail: string;
}

export interface GuestState {
  guests: Guest[];
  loading: boolean;

  getGuestsByEventId: (eventId: string) => Promise<void>;
  addGuest: (guestData: GuestFormData) => Promise<any>;
  deleteGuest: (id: string) => Promise<any>;
}
