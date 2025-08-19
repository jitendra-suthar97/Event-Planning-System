import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.ts";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventByUserId,
} from "../controllers/event.controller.ts";

const router = Router();

router.get("/get-events-by-userId", isAuthenticated, getEventByUserId);
router.post("/create-event", isAuthenticated, createEvent);
router.post("/delete-event/:id", isAuthenticated, deleteEvent);
router.post("/edit-event/:id", isAuthenticated, editEvent);

export default router;
