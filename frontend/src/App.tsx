import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/pages/Auth/SignUp";
import Login from "./components/pages/Auth/Login";
import EmailVerification from "./components/pages/Auth/EmailVerification";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/verifyEmail" element={<EmailVerification />} />
      </Routes>
    </Router>
  );
};

export default App;
