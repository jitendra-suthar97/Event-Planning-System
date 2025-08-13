import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Calendar,
  Clock,
  IndianRupee,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Ganesh Chaturthi Celebration",
      description:
        "A grand celebration with cultural programs, bhajans, and prasad distribution.",
      date: "2025-09-07",
      status: "Confirmed",
      guests: ["Ravi Kumar", "Priya Sharma", "Anil Mehta", "Sunita Joshi"],
      budget: { estimated: 15000 },
    },
    {
      id: 2,
      title: "Diwali Office Party",
      description:
        "An evening of lights, games, and delicious Indian sweets for our employees.",
      date: "2025-10-22",
      status: "Planning",
      guests: ["Rajesh Singh", "Neha Verma", "Amit Patel"],
      budget: { estimated: 25000 },
    },
    {
      id: 3,
      title: "Wedding Reception – Aryan & Meera",
      description:
        "Reception ceremony at The Leela Palace, Udaipur with live music and dance.",
      date: "2025-12-14",
      status: "Confirmed",
      guests: ["Family", "Friends", "Colleagues"],
      budget: { estimated: 500000 },
    },
    {
      id: 4,
      title: "Holi Festival Get-together",
      description:
        "Fun-filled Holi celebration with organic colors, snacks, and thandai.",
      date: "2026-03-08",
      status: "Pending",
      guests: ["Manish Gupta", "Kavita Bansal", "Rohit Kumar", "Alok Sharma"],
      budget: { estimated: 8000 },
    },
  ];

  const getDaysUntilEvent = (eventDate: string) => {
    const today = new Date();
    const event = new Date(eventDate);
    const diffTime = event.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">54 active</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2000</div>
            <p className="text-xs text-muted-foreground">1843 confirmed</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Confirmed RSVPs
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1711</div>
            <p className="text-xs text-muted-foreground">87% response rate</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹9999999 </div>
            <p className="text-xs text-muted-foreground">Across all events</p>
          </CardContent>
        </Card>
      </div>
      <div className="">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled events</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => {
                    const daysUntil = getDaysUntilEvent(event.date);
                    return (
                      <div
                        key={event.id}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-blue-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {event.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {event.description}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              event.status
                            )}`}
                          >
                            {event.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{event.guests.length} guests</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{daysUntil} days</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <IndianRupee className="size-4" />
                            <span>
                              {event.budget.estimated.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <img
                    src="https://undraw.co/api/illustrations/no_data/svg"
                    alt="No events"
                    className="w-48 h-48 mx-auto mb-4 opacity-50"
                  />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No upcoming events
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Create your first event to get started
                  </p>
                  <Button asChild>
                    <Link to="/events/new">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
