import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/pages/Auth/SignUp";
import Login from "./components/pages/Auth/Login";
import EmailVerification from "./components/pages/Auth/EmailVerification";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layouts/MainLayout";
import Dashboard from "./components/pages/Main/Dashboard";
import { Toaster } from "react-hot-toast";
import { authStore } from "./stores/authStore";
import Events from "./components/pages/Main/Event/Events";
import CreateEvent from "./components/pages/Main/Event/CreateEvent";
import EventDetails from "./components/pages/Main/Event/EventDetails";

const App = () => {
  const { token } = authStore();
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/register"
            element={!token ? <SignUp /> : <Navigate to={"/"} />}
          />
          <Route
            path="/verifyEmail"
            element={!token ? <EmailVerification /> : <Navigate to={"/"} />}
          />

          <Route
            path="/"
            element={
              token ? (
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          >
            <Route index element={<Navigate to={"/dashboard"} replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/events"
            element={
              token ? (
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              ) : (
                <Navigate to={"/login"} />
              )
            }
          >
            <Route index element={<Events />} />
            <Route path="create" element={<CreateEvent />} />
            <Route path=":id" element={<EventDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
