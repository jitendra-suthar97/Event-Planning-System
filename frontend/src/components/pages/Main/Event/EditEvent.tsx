import React from "react";
import CreateEventForm from "./CreateEventForm";
import { eventStore } from "../../../../stores/eventStore";
import type { EventFormData } from "../../../../types/Event";
import { Button } from "../../../ui/button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditEvent = () => {
  const navigate = useNavigate();
  const { currentEvent, loading, editEvent } = eventStore();

  if (!currentEvent) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Event not found</h2>
          <p className="text-muted-foreground mb-6">
            The event you're looking for doesn't exist or has been deleted.
          </p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (data: EventFormData) => {
    await editEvent(currentEvent._id, data).then((res: any) => {
      const { success, message } = res;
      if (success) {
        toast.success(message);
        navigate("/events");
      }
    });
  };

  const initialValues: EventFormData = {
    createdBy: currentEvent.createdBy,
    title: currentEvent.title,
    description: currentEvent.description,
    date: currentEvent.date,
    time: currentEvent.time,
    location: currentEvent.location,
    estimatedBudget: currentEvent.estimatedBudget,
    capacity: currentEvent.capacity,
    isPublic: currentEvent.isPublic,
    rsvpDeadline: currentEvent.rsvpDeadline || "",
    category: currentEvent.category,
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <CreateEventForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Save"
        title="Edit Event"
        description="Update your event details"
      />
    </div>
  );
};

export default EditEvent;
