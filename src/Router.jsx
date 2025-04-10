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
} from "./scenes";

import ProtectedRoute from "./ProtectedRoutes"; 
import AdminLogin from "./scenes/admin/Adminlogin"; 

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
          <Route path="/patient" element={<Team />} />
          <Route path="/patienthistory" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/finance" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/staffhistory" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
