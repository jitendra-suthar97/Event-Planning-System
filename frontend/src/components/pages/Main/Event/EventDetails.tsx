import {
  Calendar,
  CheckCircle,
  Clock,
  Clock3,
  Loader,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../ui/button";
import { authStore } from "../../../../stores/authStore";
import { eventStore } from "../../../../stores/eventStore";
import { Badge } from "../../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { formatDate, formatTime } from "../../../../utils/formatDate";
import { rsvpStore } from "../../../../stores/rsvpStore";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { loggedInUser } = authStore();
  const { loading, currentEvent, getEventById, deleteEvent } = eventStore();
  const { rsvps, rsvpStats, getRSVPsByEventId, getRSVPStats } = rsvpStore();

  useEffect(() => {
    if (id) {
      getEventById(id);
      getRSVPsByEventId(id);
      getRSVPStats(id);
    }
  }, [id, getEventById, getRSVPStats, getRSVPsByEventId]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center py-12">
          <Loader size={48} className="mb-4" />
          <span>Loading event details...</span>
        </div>
      </div>
    );
  }

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

  const eventDate = new Date(currentEvent.date);
  const isUpcomming = eventDate >= new Date();
  const isOwner = loggedInUser?.id === currentEvent.createdBy;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold">{currentEvent.title}</h1>
              {currentEvent.isPublic && (
                <Badge variant={"secondary"}>Public</Badge>
              )}
              {isUpcomming ? (
                <Badge variant={"default"}>Upcoming</Badge>
              ) : (
                <Badge variant={"outline"}>Past Event</Badge>
              )}
            </div>
            <p className="text-muted-foreground">{currentEvent.description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {formatDate(currentEvent.date.toString())}
                      </p>
                      <p className="text-sm text-muted-foreground">Date</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {formatTime(currentEvent.time)}
                      </p>
                      <p className="text-sm text-muted-foreground">Time</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{currentEvent.location}</p>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        Up to {currentEvent.capacity}
                      </p>
                      <p className="text-sm text-muted-foreground">Capacity</p>
                    </div>
                  </div>
                </div>
                {currentEvent.rsvpDeadline && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center">
                      <Clock3 className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          RSVP by{" "}
                          {formatDate(currentEvent.rsvpDeadline.toString())}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          RSVP Deadline
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {isOwner && rsvps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Guest List</CardTitle>
                  <CardDescription>
                    {rsvps.length}{" "}
                    {rsvps.length === 1 ? "person has" : "people have"}{" "}
                    responded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rsvps.map((rsvp) => (
                      <div
                        key={rsvp.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{rsvp.guestName}</p>
                          <p className="text-sm text-muted-foreground">
                            {rsvp.guestEmail}
                          </p>
                          {rsvp.notes && (
                            <p className="text-sm text-muted-foreground mt-1">
                              "{rsvp.notes}"
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          {rsvp.status === "accepted" && (
                            <Badge
                              variant="default"
                              className="bg-green-100 text-green-800"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Attending
                            </Badge>
                          )}
                          {rsvp.status === "declined" && (
                            <Badge
                              variant="secondary"
                              className="bg-red-100 text-red-800"
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Not Attending
                            </Badge>
                          )}
                          {rsvp.status === "pending" && (
                            <Badge variant="outline">
                              <Clock3 className="h-3 w-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
