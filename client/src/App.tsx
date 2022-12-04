import { Theme, setTheme } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Register from "./pages/register/Register";
import Verify from "./pages/verify/Verify";
import Dashboard from "./pages/dashboard/Dashboard";
import CheckIn from "./pages/check-in/CheckIn";
import CheckOut from "./pages/check-out/CheckOut";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Error from "./pages/error/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Particles from "./components/particles/Particles";
import themes from "./_themes.module.scss";

const App = () => {
  const theme: setTheme | null = Theme();

  return (
    <div className={theme && theme.darkMode ? "theme--dark" : "theme--light"}>
      <Particles num={40} radius={6} color={themes["primary_color"]} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          {/* 
          The paths "/check-in" and "/check-out" will render the CheckIn component, which expects 
          search params courtType and courtNum. Examples:

          /check-in/?courtType=Tennis&courtNum=1
          /check-out/?courtType=Tennis&courtNum=1
          */}
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/check-out" element={<CheckOut />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
