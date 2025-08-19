import type { Request, Response } from "express";
import Event from "../models/event.model.ts";
import Guest from "../models/guest.model.ts";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      date,
      time,
      location,
      createdBy,
      estimatedBudget,
      capacity,
      isPublic,
      rsvpDeadline,
      category,
    } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      createdBy,
      estimatedBudget,
      capacity,
      isPublic,
      rsvpDeadline,
      category,
    });

    await newEvent.save();

    res
      .status(201)
      .json({ success: true, message: "Event created successfully" });
  } catch (error) {
    console.log("Error in createEvent controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getEventByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const events = await Event.find({ createdBy: userId }).sort({ date: 1 });
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.log("Error in getEventByUserId controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);

    await Guest.deleteMany({ eventId: id });

    res
      .status(200)
      .json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.log("Error in deleteEvent controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      date,
      time,
      location,
      createdBy,
      estimatedBudget,
      capacity,
      isPublic,
      rsvpDeadline,
      category,
    } = req.body;

    const existingEvent = await Event.findById(id);

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    existingEvent.title = title ?? existingEvent.title;
    existingEvent.description = description ?? existingEvent.description;
    existingEvent.date = date ?? existingEvent.date;
    existingEvent.time = time ?? existingEvent.time;
    existingEvent.location = location ?? existingEvent.location;
    existingEvent.estimatedBudget =
      estimatedBudget ?? existingEvent.estimatedBudget;
    existingEvent.capacity = capacity ?? existingEvent.capacity;
    existingEvent.isPublic = isPublic ?? existingEvent.isPublic;
    existingEvent.rsvpDeadline = rsvpDeadline ?? existingEvent.rsvpDeadline;
    existingEvent.category = category ?? existingEvent.category;

    const updatedEvent = await existingEvent.save();

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      updatedEvent,
    });
  } catch (error) {
    console.log("Error in editEvent controller: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
