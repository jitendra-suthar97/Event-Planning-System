import { Categories } from "../types/Event";
import * as Yup from "yup";

export const VenueSchema = Yup.object().shape({
  name: Yup.string()
    .required("Venue name is required")
    .min(3, "Venue name must be at least 3 characters")
    .max(100, "Venue name must be less than 100 characters"),
  location: Yup.string()
    .required("Location is required")
    .min(10, "Location must be at least 10 characters")
    .max(200, "Location must be less than 200 characters"),
  capacity: Yup.number()
    .required("Capacity is required")
    .min(1, "Capacity must be at least 1")
    .max(10000, "Capacity must be less than 10,000"),
  pricePerDay: Yup.number()
    .required("Price per day is required")
    .min(0, "Price must be positive"),
  description: Yup.string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  imageURL: Yup.array()
    .of(Yup.string().url("Each image must be a valid URL"))
    .min(1, "At least one image URL is required")
    .required("Image URLs are required"),
  available: Yup.boolean().required("Availability status is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  category: Yup.mixed<Categories>()
    .oneOf(Object.values(Categories), "Please select a valid category")
    .required("Category is required"),
  amenities: Yup.array()
    .of(Yup.string())
    .min(1, "At least one amenity is required")
    .required("Amenities are required"),
});
