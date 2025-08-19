import cron from "node-cron";
import Event from "../../models/event.model.ts";
import Guest from "../../models/guest.model.ts";
import { sendReminderEmail } from "./mail.ts";

export const scheduleEventReminder = () => {
  cron.schedule("0 * * * *", async () => {
    const upcomingEvents = await Event.find({
      date: {
        $gte: new Date(),
        $lte: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    for (const event of upcomingEvents) {
      const guests = await Guest.find({ eventId: event._id });

      for (const guest of guests) {
        await sendReminderEmail(guest.guestEmail, event.title, event.date);
      }
    }
  });
};
