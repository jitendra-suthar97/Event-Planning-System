import { Categories } from "../types/Event";
import * as yup from "yup";

export const eventValidationSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  date: yup
    .date()
    .required("Event date is required")
    .min(new Date(), "Event date must be in the future"),
  time: yup.string().required("Time is required"),
  location: yup
    .string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters"),
  createdBy: yup.string().required("Creator name is required"),
  estimatedBudget: yup
    .number()
    .typeError("Budget must be a number")
    .required("Estimated budget is required")
    .positive("Budget must be positive"),
  capacity: yup
    .number()
    .typeError("Capacity must be a number")
    .required("Capacity is required")
    .positive("Capacity must be positive"),
  isPublic: yup
    .boolean()
    .transform((val, orig) => orig === "true")
    .required("Visibility is required"),
  rsvpDeadline: yup
    .date()
    .required("RSVP deadline is required")
    .test(
      "before-event-date",
      "RSVP deadline must be before event date",
      function (value) {
        const { date } = this.parent;
        return value && date ? value < date : true;
      }
    ),
  category: yup
    .mixed<Categories>()
    .oneOf(Object.values(Categories), "Invalid category")
    .required("Category is required"),
});
