import {
  BarChart3,
  Calendar,
  Home,
  LogOut,
  MapPin,
  Settings,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { authStore } from "../../stores/authStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Venues", href: "/venues", icon: MapPin },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout, loggedInUser, getLoggedInUser } = authStore();

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout().then(() => {
        navigate("/login");
      });
    } catch (error) {}
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200">
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
        </div>
      </div>
      <div className="pl-64">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between h-9">
            <div className="">
              <h2 className="text-2xl font-bold text-gray-900">
                {navigation.find((item) => item.href === location.pathname)
                  ?.name || ""}
              </h2>
            </div>
            <div>
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
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
