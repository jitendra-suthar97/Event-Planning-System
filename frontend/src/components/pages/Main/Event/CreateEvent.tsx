import { Button } from "../../../ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CreateEventForm from "./CreateEventForm";
import { eventStore } from "../../../../stores/eventStore";
import { type EventFormData } from "../../../../types/Event";
import toast from "react-hot-toast";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createEvent, loading } = eventStore();
  const venueFromParams = searchParams.get("venue");
  const locationFromParams = searchParams.get("location");

  const handleCreateEvent = async (values: EventFormData) => {
    console.log("Event values: ", values);
    await createEvent(values).then((res: any) => {
      const { success, message } = res;
      if (success) {
        toast.success(message);
        navigate("/events");
      }
    });
  };

  const initialValues =
    venueFromParams && locationFromParams
      ? {
          location: `${venueFromParams} - ${locationFromParams}`,
        }
      : {};
  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <div className="flex items-center space-x-4">
        <Button variant={"ghost"} onClick={() => navigate("/events")}>
          <ArrowLeft className="size-4" />
          Back to Events
        </Button>
      </div>
      <CreateEventForm
        submitText="Create Event"
        onSubmit={handleCreateEvent}
        description={
          venueFromParams
            ? `Creating an event at ${venueFromParams}`
            : "Fill in the details to create your event"
        }
        initialValues={initialValues}
        loading={loading}
      />
    </div>
  );
};

export default CreateEvent;
