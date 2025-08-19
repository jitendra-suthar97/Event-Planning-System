import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { eventStore } from "../../../../stores/eventStore";
import { rsvpStore } from "../../../../stores/guestStore";
import { authStore } from "../../../../stores/authStore";

import { Badge } from "../../../ui/badge";
import { Button } from "../../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";

import { Formik, Form, Field } from "formik";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Clock3,
  Plus,
  Loader,
  Edit,
  Trash2,
  EllipsisVertical,
} from "lucide-react";
import { formatDate, formatTime } from "../../../../utils/formatDate";
import { AddGuestSchema } from "../../../../schemas/GuestSchema";
import toast from "react-hot-toast";
import type { Guest } from "src/types/Guest";

const EventDetails = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { loggedInUser } = authStore();
  const { currentEvent, loading: eventLoading } = eventStore();
  const {
    guests,
    getGuestsByEventId,
    addGuest,
    deleteGuest,
    loading: guestLoading,
  } = rsvpStore();

  useEffect(() => {
    getGuestsByEventId(id!);
  }, [getGuestsByEventId, addGuest]);

  const handleDelete = async (guest: Guest) => {
    if (
      window.confirm(
        `Are you sure you want to delete guest "${guest.guestName}"?`
      )
    ) {
      await deleteGuest(guest._id).then((res: any) => {
        const { success, message } = res;
        if (success) {
          toast.success(message);
        }
      });
    }
  };

  if (eventLoading || !currentEvent) {
    return (
      <div className="container mx-auto py-12 flex flex-col items-center">
        {eventLoading ? <Loader size={48} className="mb-4" /> : null}
        <span>{eventLoading ? "Loading event..." : "Event not found"}</span>
      </div>
    );
  }

  const isOwner = loggedInUser?._id === currentEvent.createdBy;
  const eventDate = new Date(currentEvent.date);
  const isUpcoming = eventDate >= new Date();

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{currentEvent.title}</h1>
        <p className="text-muted-foreground">{currentEvent.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {currentEvent.isPublic && <Badge variant="secondary">Public</Badge>}
          {isUpcoming ? (
            <Badge variant="default">Upcoming</Badge>
          ) : (
            <Badge variant="outline">Past</Badge>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-muted-foreground" />
          <span>{formatDate(currentEvent.date.toString())}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <span>{formatTime(currentEvent.time)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <span>{currentEvent.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-muted-foreground" />
          <span>{currentEvent.capacity} Guests</span>
        </div>
        {currentEvent.rsvpDeadline && (
          <div className="flex items-center space-x-2 col-span-1 md:col-span-2 lg:col-span-4">
            <Clock3 className="w-5 h-5 text-muted-foreground" />
            <span>
              RSVP by {formatDate(currentEvent.rsvpDeadline.toString())}
            </span>
          </div>
        )}
      </div>

      {isOwner && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Guest List</h2>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="size-4" />
                  Add Guest
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>New Guest</DialogTitle>
                </DialogHeader>

                <Formik
                  initialValues={{
                    eventId: id!,
                    guestName: "",
                    guestEmail: "",
                  }}
                  validationSchema={AddGuestSchema}
                  onSubmit={async (values, { resetForm }) => {
                    if (!id) return;
                    await addGuest(values).then((res: any) => {
                      const { success, message } = res;
                      if (success) {
                        toast.success(message);
                      }
                    });
                    resetForm();
                    setOpen(false);
                  }}
                >
                  {({ setFieldValue, errors, touched }) => {
                    useEffect(() => {
                      setFieldValue("eventId", id);
                    }, [setFieldValue]);
                    return (
                      <Form className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Name
                          </label>
                          <Field
                            name="guestName"
                            placeholder="Enter guest name"
                            className="w-full p-2 border rounded"
                          />
                          {errors.guestName && touched.guestName && (
                            <p className="text-red-500 text-sm">
                              {errors.guestName}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Email
                          </label>
                          <Field
                            type="email"
                            name="guestEmail"
                            placeholder="Enter guest email"
                            className="w-full p-2 border rounded"
                          />
                          {errors.guestEmail && touched.guestEmail && (
                            <p className="text-red-500 text-sm">
                              {errors.guestEmail}
                            </p>
                          )}
                        </div>

                        <Button type="submit" disabled={guestLoading}>
                          {guestLoading ? "Adding..." : "Add Guest"}
                        </Button>
                      </Form>
                    );
                  }}
                </Formik>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>RSVP Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((guest) => (
                <TableRow key={guest._id}>
                  <TableCell>{guest.guestName}</TableCell>
                  <TableCell>{guest.guestEmail}</TableCell>
                  <TableCell>
                    {guest.rsvpStatus === "accepted" && (
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800"
                      >
                        Attending
                      </Badge>
                    )}
                    {guest.rsvpStatus === "declined" && (
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-800"
                      >
                        Not Attending
                      </Badge>
                    )}
                    {guest.rsvpStatus === "pending" && (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell className="items-end">
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
                        {/* <DropdownMenuItem
                          asChild
                          className="cursor-pointer group"
                        >
                          <Link
                            onClick={() => }
                            to={`/events/${guest._id}/edit`}
                            className="flex items-center w-full px-2 py-1.5 rounded-md transition-colors group-hover:bg-gray-100 group-hover:text-blue-600"
                          >
                            <Edit className="mr-2 size-4 transition-colors group-hover:text-blue-600" />
                            <span className="group-hover:text-blue-600">
                              Edit
                            </span>
                          </Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem
                          onClick={() => handleDelete(guest)}
                          className="cursor-pointer focus:text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-md"
                        >
                          <Trash2 className="size-4 mr-2 group-hover:text-red-700 transition-colors" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
