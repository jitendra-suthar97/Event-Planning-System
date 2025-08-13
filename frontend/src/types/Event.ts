export enum EventCategories {
  Conference = "Conference",
  Workshop = "Workshop",
  Concert = "Concert",
  Webinar = "Webinar",
  Festival = "Festival",
  Birthday = "Birthday",
  Wedding = "Wedding",
}

export interface EventFormData {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  createdBy: string;
  estimatedBudget: number;
  capacity: number;
  isPublic: boolean;
  rsvpDeadline: Date;
  catagory: EventCategories;
}

export interface Event extends EventFormData {
  id: string;
}

export interface EventStore {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  createEvent: (data: EventFormData) => Promise<any>;
  getEventById: (id: string) => Promise<void>;
  getEventsByUserId: (id: string) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  clearCurrentEvent: () => void;
}
