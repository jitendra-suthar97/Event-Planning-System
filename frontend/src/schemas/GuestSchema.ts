import * as Yup from "yup";

export const AddGuestSchema = Yup.object().shape({
  guestName: Yup.string().required("Guest name is required"),
  guestEmail: Yup.string().email("Invalid email").required("Email is required"),
});
