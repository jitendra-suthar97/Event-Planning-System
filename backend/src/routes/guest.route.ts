import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.ts";
import {
  addGuest,
  deleteGuest,
  getGuestsByEventId,
} from "../controllers/guest.controller.ts";

const router = Router();

router.get("/get-guests-by-event-id/:id", isAuthenticated, getGuestsByEventId);
router.post("/add-guest", isAuthenticated, addGuest);
router.post("/delete-guest/:id", isAuthenticated, deleteGuest);

export default router;
