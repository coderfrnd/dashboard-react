import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,
  Patient,
} from "./scenes";
import AttendanceManagement from "./scenes/attendance/AttendanceManagement";
import PatientAdd from "./scenes/dashboard/PatientAdd";
import ProtectedRoute from "./ProtectedRoutes"; 
import AdminLogin from "./scenes/admin/Adminlogin"; 
import PatientBoard from "./scenes/dashboard/PatientBoard";
import FinancialBoard from "./scenes/dashboard/FinancialBoard";
import StaffBoard from "./scenes/dashboard/StaffBoard";

const AppRouter = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("admin") === "true"
  );

  useEffect(() => {
    const checkLogin = () => {
      const admin = localStorage.getItem("admin") === "true";
      setIsAdminLoggedIn(admin);
    };
    checkLogin();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isAdminLoggedIn}>
              <App />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/patient" element={<PatientBoard />} />
          <Route path="/add-patient" element={<PatientAdd />} />
          <Route path="/patienthistory" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/staff-attendance" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/finance" element={<FinancialBoard />} />
          <Route path="/line" element={<Line />} />
          <Route path="/staff" element={<StaffBoard/>} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/attendance" element={<AttendanceManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
