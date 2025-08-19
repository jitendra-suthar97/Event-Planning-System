import {
  CalendarIcon,
  Clock,
  IndianRupee,
  Loader,
  MapPin,
  Save,
  Users,
} from "lucide-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "../../../ui/label";
import { Textarea } from "../../../ui/textarea";
import { Categories, type EventFormData } from "../../../../types/Event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Button } from "../../../ui/button";
import { useNavigate } from "react-router-dom";
import { eventValidationSchema } from "../../../../schemas/EventSchema";
import { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Calendar } from "../../../ui/calendar";
import { format } from "date-fns";
import { Input } from "../../../ui/input";

interface EventFormProps {
  initialValues?: Partial<EventFormData>;
  onSubmit: (values: EventFormData) => Promise<void>;
  loading?: boolean;
  title?: string;
  description?: string;
  submitText: string;
}

const CreateEventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  loading,
  title,
  description,
  submitText,
}) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")!;

  const now = new Date();
  const defaultTime =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");
  const defaultValues: EventFormData = {
    title: "",
    description: "",
    date: "",
    time: defaultTime,
    location: "",
    createdBy: userId,
    estimatedBudget: 0,
    capacity: 0,
    isPublic: true,
    rsvpDeadline: "",
    category: Categories.Conference,
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ ...defaultValues, ...initialValues }}
            onSubmit={onSubmit}
            validationSchema={eventValidationSchema}
          >
            {({ isSubmitting, setFieldValue }) => {
              useEffect(() => {
                setFieldValue("createdBy", userId);
              }, [setFieldValue]);
              return (
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

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date *</Label>

                        <Field name="date">
                          {({ field, form }: any) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`w-full justify-start text-left font-normal ${
                                    !field.value ? "text-muted-foreground" : ""
                                  }`}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0" align="start">
                                <Calendar
                                  mode="single"
                                  className="w-full"
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  captionLayout="dropdown"
                                  onSelect={(date) =>
                                    form.setFieldValue(
                                      "date",
                                      date ? date.toISOString() : ""
                                    )
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        </Field>

                        <ErrorMessage
                          name="date"
                          component="p"
                          className="text-sm text-red-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rsvpDeadline">RSVP Deadline</Label>

                        <Field name="rsvpDeadline">
                          {({ field, form }: any) => (
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={`w-full justify-start text-left font-normal ${
                                    !field.value ? "text-muted-foreground" : ""
                                  }`}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 " />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0" align="start">
                                <Calendar
                                  mode="single"
                                  className="w-full"
                                  captionLayout="dropdown"
                                  fromYear={2000}
                                  toYear={2100}
                                  selected={
                                    field.value
                                      ? new Date(field.value)
                                      : undefined
                                  }
                                  onSelect={(date) =>
                                    form.setFieldValue(
                                      "rsvpDeadline",
                                      date ? date.toISOString() : ""
                                    )
                                  }
                                />
                              </PopoverContent>
                            </Popover>
                          )}
                        </Field>

                        <ErrorMessage
                          name="rsvpDeadline"
                          component="p"
                          className="text-sm text-red-600"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Time *</Label>

                        <Field name="time">
                          {({ field }: any) => (
                            <Input type="time" id="time" {...field} />
                          )}
                        </Field>

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
                          Capacity
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

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Field
                        as="select"
                        name="category"
                        className="w-full border rounded-md p-2"
                      >
                        <option value="">Select category</option>
                        {Object.values(Categories).map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="category"
                        component="p"
                        className="text-sm text-red-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="isPublic">Visibility *</Label>
                      <Field
                        as="select"
                        name="isPublic"
                        className="w-full border rounded-md p-2"
                      >
                        <option value="true">Public</option>
                        <option value="false">Private</option>
                      </Field>
                      <ErrorMessage
                        name="isPublic"
                        component="p"
                        className="text-sm text-red-600"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
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
                      disabled={loading || isSubmitting}
                    >
                      {loading || isSubmitting ? (
                        <Loader className="mr-2" />
                      ) : (
                        <>
                          <Save className="h-4 w-4 " />
                          {submitText}
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEventForm;
