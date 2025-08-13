import {
  ArrowLeft,
  Calendar,
  Clock,
  IndianRupee,
  MapPin,
  Save,
  Users,
} from "lucide-react";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { eventStore } from "../../../../stores/eventStore";
import { EventCategories, type EventFormData } from "../../../../types/Event";

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
  isPublic: yup.boolean().required("Visibility is required"),
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
  catagory: yup
    .mixed<EventCategories>()
    .oneOf(Object.values(EventCategories), "Invalid category")
    .required("Category is required"),
});

const CreateEvent = () => {
  const navigate = useNavigate();
  const { createEvent } = eventStore();

  const initialValues: EventFormData = {
    title: "",
    description: "",
    date: new Date(),
    time: "",
    location: "",
    createdBy: "",
    estimatedBudget: 0,
    capacity: 0,
    isPublic: true,
    rsvpDeadline: new Date(),
    catagory: EventCategories.Conference,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <div className="flex items-center space-x-4">
        <Button variant={"ghost"} onClick={() => navigate("/events")}>
          <ArrowLeft className="size-4" />
          Back to Events
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              await createEvent(values);
            }}
            validationSchema={eventValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Field
                      name="title"
                      placeholder="Enter event title"
                      className="w-full border rounded-md p-2"
                    />
                    <ErrorMessage
                      name="title"
                      component="p"
                      className="text-sm text-red-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Field
                      as={Textarea}
                      name="description"
                      placeholder="Describe your event"
                      rows={4}
                    />
                    <ErrorMessage
                      name="description"
                      component="p"
                      className="text-sm text-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Date *
                      </Label>
                      <Field
                        name="date"
                        type="date"
                        className="w-full border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="date"
                        component="p"
                        className="text-sm text-red-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Time *
                      </Label>
                      <Field
                        name="time"
                        type="time"
                        className="w-full border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="time"
                        component="p"
                        className="text-sm text-red-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      Location *
                    </Label>
                    <Field
                      name="location"
                      placeholder="Event location"
                      className="w-full border rounded-md p-2"
                    />
                    <ErrorMessage
                      name="location"
                      component="p"
                      className="text-sm text-red-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">
                        <Users className="inline h-4 w-4 mr-1" />
                        Capacity *
                      </Label>
                      <Field
                        name="capacity"
                        type="number"
                        min="1"
                        className="w-full border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="capacity"
                        component="p"
                        className="text-sm text-red-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedBudget">
                        <IndianRupee className="inline h-4 w-4 mr-1" />
                        Estimated Budget *
                      </Label>
                      <Field
                        name="estimatedBudget"
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-full border rounded-md p-2"
                      />
                      <ErrorMessage
                        name="estimatedBudget"
                        component="p"
                        className="text-sm text-red-600"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/events")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600"
                    disabled={isSubmitting}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvent;
