import { Calendar, Eye, IndianRupee, MapPin, Plus, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../ui/button";
import { eventStore } from "../../../../stores/eventStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

const Events = () => {
  const { events } = eventStore();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Manage all your events</p>
        </div>
        <Button asChild className="bg-blue-500">
          <Link to={"/events/create"}>
            <Plus className="size-4 mr-2" />
            New Event
          </Link>
        </Button>
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {event.description}
                    </CardDescription>
                  </div>
                  <span>{}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {event.date.toLocaleString()} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  {/* <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      {event.guests.length} / {event.capacity} guests
                    </span>
                  </div> */}
                  <div className="flex items-center text-sm text-gray-600">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    <span>
                      ₹{event.estimatedBudget.toLocaleString()} budget
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt4 border-t border-gray-200">
                  <Button asChild className="w-full" variant={"outline"}>
                    <Link to={`/events/${event.id}`}>
                      <Eye className="size-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <img
              src="/Events-pana.png"
              alt="No events"
              className="w-64 h-64 mx-auto mb-6"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No events yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first event to get started with event management
            </p>
            <Button asChild className="bg-blue-500">
              <Link to="/events/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Events;
