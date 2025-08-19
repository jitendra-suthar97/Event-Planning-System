import type { Categories } from "./Event";

export interface VenueFormData {
  name: string;
  location: string;
  capacity: number;
  pricePerDay: number;
  amenities: string[];
  description: string;
  imageURL: string[];
  available: boolean;
  rating: number;
  category: Categories;
}

export interface Venue extends VenueFormData {
  _id: string;
}

export const amenityOptions = [
  "Sound System",
  "Lighting",
  "Catering Kitchen",
  "Parking",
  "WiFi",
  "AV Equipment",
  "Whiteboards",
  "Coffee Service",
  "Bar Service",
  "Outdoor Seating",
  "Garden Views",
  "City Views",
  "Air Conditioning",
  "Heating",
  "Stage",
  "Dance Floor",
  "Projector",
  "Microphones",
];

export interface VenueStore {
  venues: Venue[];
  currentVenue: Venue | null;
  loading: boolean;
  addVenue: (data: VenueFormData) => Promise<void>;
  getVenueById: (id: string) => Promise<void>;
  deleteVenue: (id: string) => Promise<void>;
  clearCurrentVenue: () => void;
}
