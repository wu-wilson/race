import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Register from "./pages/register/Register";
import Verify from "./pages/verify/Verify";
import Dashboard from "./pages/dashboard/Dashboard";
import Error from "./pages/error/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import Particles from "./components/particles/Particles";
import vars from "./index.module.scss";

const App = () => {
  return (
    <div>
      <ThemeContextProvider>
        <Particles num={40} radius={6} color={vars["primary_color"]} />
        <AuthContextProvider>
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
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
};
export default App;
