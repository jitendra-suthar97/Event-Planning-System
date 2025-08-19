import {
  Calendar,
  Edit,
  EllipsisVertical,
  Eye,
  IndianRupee,
  MapPin,
  MoreHorizontal,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { eventStore } from "../../../../stores/eventStore";
import { formatDate, formatTime } from "../../../../utils/formatDate";
import type { Event } from "../../../../types/Event";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import { Card, CardContent } from "../../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { authStore } from "../../../../stores/authStore";
import toast from "react-hot-toast";

const Events = () => {
  const naviagte = useNavigate();
  const { events, getEventsByUserId, setCurrentEvent, deleteEvent } =
    eventStore();
  const { isAdmin } = authStore();

  useEffect(() => {
    getEventsByUserId();
  }, [getEventsByUserId]);

  const handleViewEventDetails = (event: Event) => {
    naviagte(`/events/${event._id}`);
    setCurrentEvent(event);
  };

  const handleDelete = async (event: Event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      try {
        await deleteEvent(event._id).then((res: any) => {
          const { success, message } = res;
          if (success) {
            toast.success(message);
          } else {
            toast.error(message);
          }
        });
      } catch (error) {
        console.error("Failed to delete event:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-600">
            Create, manage, and track all your events
          </p>
        </div>
        {events.length > 0 && (
          <Button asChild className="bg-blue-500">
            <Link to={"/events/create"}>
              <Plus className="size-4" />
              New Event
            </Link>
          </Button>
        )}
      </div>
      {events.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id} className="hover:bg-gray-100">
                <TableCell>
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => handleViewEventDetails(event)}
                    >
                      {event.title}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    {formatDate(event.date)} at {formatTime(event.time)}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-green-500" />
                    {event.location}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <IndianRupee className="h-4 w-4 text-amber-500" />
                    {event.estimatedBudget.toLocaleString()}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center text-sm">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                      {event.category}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-center">
                    {isAdmin && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <EllipsisVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-xl shadow-md"
                        >
                          <DropdownMenuItem
                            asChild
                            className="cursor-pointer group"
                          >
                            <Link
                              onClick={() => setCurrentEvent(event)}
                              to={`/events/${event._id}/edit`}
                              className="flex items-center w-full px-2 py-1.5 rounded-md transition-colors group-hover:bg-gray-100 group-hover:text-blue-600"
                            >
                              <Edit className="mr-2 size-4 transition-colors group-hover:text-blue-600" />
                              <span className="group-hover:text-blue-600">
                                Edit
                              </span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(event)}
                            className="cursor-pointer focus:text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-md"
                          >
                            <Trash2 className="size-4 mr-2 group-hover:text-red-700 transition-colors" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Card className="p-8 text-center shadow-sm">
          <CardContent>
            <img
              src="/Events-pana.png"
              alt="No events"
              className="w-52 h-52 mx-auto mb-6 opacity-90"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No events yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start by creating your first event and manage everything in one
              place.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 px-6">
              <Link to="/events/create">
                <Plus className="h-4 w-4 mr-2" /> Create Your First Event
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Events;
