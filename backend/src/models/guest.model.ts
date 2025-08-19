import { Document, Schema, model } from "mongoose";

type Status = "pending" | "accepted" | "declined";

interface GuestDocument extends Document {
  eventId: Schema.Types.ObjectId;
  guestName: string;
  guestEmail: string;
  rsvpStatus: Status;
  confirmation: string;
}

const guestSchema = new Schema<GuestDocument>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    guestName: {
      type: String,
      required: true,
    },
    guestEmail: {
      type: String,
      required: true,
      unique: true,
    },
    rsvpStatus: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    confirmation: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Guest = model<GuestDocument>("Guest", guestSchema);
export default Guest;
