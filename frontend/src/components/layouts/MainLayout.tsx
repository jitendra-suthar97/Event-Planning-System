import { Calendar, Home, LogOut, MapPin, Menu, X } from "lucide-react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { authStore } from "../../stores/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Venues", href: "/venues", icon: MapPin },
];

const MainLayout = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  const { logout, loggedInUser, getLoggedInUser } = authStore();

  useEffect(() => {
    getLoggedInUser(userId!);
  }, []);

  const handleLogout = async () => {
    try {
      await logout().then((res: any) => {
        const { success, message } = res;
        if (success) {
          localStorage.clear();
          navigate("/login");
          toast.success(message);
        }
      });
    } catch (error) {}
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    breadcrumbs.push({
      label: "Dashboard",
      href: "/dashboard",
      isActive: location.pathname === "/dashboard",
    });

    if (pathSegments.includes("events")) {
      if (pathSegments.length === 1) {
        breadcrumbs.push({
          label: "Events",
          href: "/events",
          isActive: true,
        });
      } else if (pathSegments.includes("create")) {
        breadcrumbs.push({
          label: "Events",
          href: "/events",
          isActive: false,
        });
        breadcrumbs.push({
          label: "Create Event",
          href: "/events/create",
          isActive: true,
        });
      } else if (params.id) {
        breadcrumbs.push({
          label: "Events",
          href: "/events",
          isActive: false,
        });
        breadcrumbs.push({
          label: "Event Details",
          href: `/events/${params.id}`,
          isActive: !pathSegments.includes("edit"),
        });
        if (pathSegments.includes("edit")) {
          breadcrumbs.push({
            label: "Edit Event",
            href: `/events/${params.id}/edit`,
            isActive: true,
          });
        }
      }
    } else if (pathSegments.includes("venues")) {
      breadcrumbs.push({
        label: "Venues",
        href: "/venues",
        isActive: true,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Calendar className="size-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">EPlanner</h1>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  to={item.href}
                  key={item.name}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="mr-3 size-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-200 mt-auto md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <img
                    src={loggedInUser?.profileImage || "/avatar.png"}
                    alt={loggedInUser?.userName}
                    className="size-8 rounded-full"
                  />
                  <p className="text-sm font-medium">
                    {loggedInUser?.userName}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="md:pl-64">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Button
            variant={"ghost"}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>

          <div className="flex-1 ml-4">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.href}>
                    <BreadcrumbItem>
                      {breadcrumb.isActive ? (
                        <BreadcrumbPage className="text-lg font-semibold">
                          {breadcrumb.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link
                            to={breadcrumb.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {breadcrumb.label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="w-full p-1 flex items-center justify-start gap-2 cursor-pointer">
                  <div className="text-left">
                    <p className="text-lg font-medium">
                      {loggedInUser?.userName}
                    </p>
                  </div>
                  <img
                    src={loggedInUser?.profileImage || "/avatar.png"}
                    alt={loggedInUser?.userName}
                    className="size-8 rounded-full"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
