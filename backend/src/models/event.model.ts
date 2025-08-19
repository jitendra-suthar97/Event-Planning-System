import { Document, Schema, model } from "mongoose";

export type EventCategories =
  | "Conference"
  | "Workshop"
  | "Concert"
  | "Webinar"
  | "Festival"
  | "Birthday"
  | "Wedding"
  | "Meeting";

export interface EventDocument extends Document {
  createdBy: Schema.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  estimatedBudget: number;
  budgetSpend: number;
  capacity?: number;
  isPublic: boolean;
  rsvpDeadline?: Date;
  category: EventCategories;
}

const eventSchema = new Schema<EventDocument>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    estimatedBudget: {
      type: Number,
      required: true,
    },
    budgetSpend: {
      type: Number,
      default: 0,
    },
    capacity: {
      type: Number,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    rsvpDeadline: {
      type: Date,
    },
    category: {
      type: String,
      enum: [
        "Conference",
        "Workshop",
        "Concert",
        "Webinar",
        "Festival",
        "Birthday",
        "Wedding",
        "Meeting",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Event = model<EventDocument>("Event", eventSchema);
export default Event;
