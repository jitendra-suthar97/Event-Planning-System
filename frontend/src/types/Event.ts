export enum Categories {
  Conference = "Conference",
  Workshop = "Workshop",
  Concert = "Concert",
  Webinar = "Webinar",
  Festival = "Festival",
  Birthday = "Birthday",
  Wedding = "Wedding",
  Meeting = "Meeting",
}

export interface EventFormData {
  createdBy: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  estimatedBudget: number;
  capacity?: number;
  isPublic: boolean;
  rsvpDeadline?: string;
  category: Categories;
}

export interface Event extends EventFormData {
  _id: string;
  budgetSpend?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventStore {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  setCurrentEvent: (data: Event) => void;
  createEvent: (data: EventFormData) => Promise<any>;
  getEventsByUserId: () => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  clearCurrentEvent: () => void;
  editEvent: (id: string, data: EventFormData) => Promise<any>;
}
