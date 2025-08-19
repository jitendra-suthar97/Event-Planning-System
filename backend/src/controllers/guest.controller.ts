import type { Request, Response } from "express";
import Guest from "../models/guest.model.ts";

export const addGuest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { eventId, guestEmail, guestName } = req.body;

    const existingGuestWithEmail = await Guest.findOne({ guestEmail, eventId });

    if (existingGuestWithEmail) {
      return res.status(400).json({
        success: false,
        message: "Guest with this email already invited to the event",
      });
    }

    const newGuest = new Guest({
      eventId,
      guestName,
      guestEmail,
      rsvpStatus: "pending",
      confirmation: "pending",
    });

    await newGuest.save();

    res.status(201).json({
      success: true,
      message: "Guest added successfully",
      newGuest,
    });
  } catch (error) {
    console.log("Error in addGuest controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getGuestsByEventId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const guests = await Guest.find({ eventId: id });

    res.status(200).json({ success: true, guests });
  } catch (error) {
    console.log("Error in getGuestsByEventId controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteGuest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Guest.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Guest deleted successfully" });
  } catch (error) {
    console.log("Error in deleteGuest controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
