import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
// import CreateAccount from "../pages/auth/createAccount";
import AdminDashboard from "../pages/dashboard/admin/index";
import AdminClient from "../pages/dashboard/admin/client";
import AdminCalendar from "../pages/dashboard/admin/calendar";
import Layout from "../components/layout";
import Form from "../pages/auth/create-account";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Login from "../pages/Login";
import ApplyForLoan from "../pages/loan/components/LoanApplication";
import UserDashboard from "../pages/dashboard/customer/UserDashboard";

const AppRoutes = () => (
  <BrowserRouter>
  <Routes>
    {/* Routes without Sidebar */}
    <Route path="/" element={<HomePage />} />
    <Route path="/create-account" element={<Form />} />
    <Route path="/" element={<HomePage />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/apply-for-loan" element={<ApplyForLoan />} />
			<Route path="/user-dashboard" element={<UserDashboard />} />

    {/* Admin Routes with Sidebar */}
    <Route path="/admin" element={<Layout />}>
      <Route index element={<AdminDashboard />} /> 
      <Route path="clients" element={<AdminClient />} />
      <Route path="calendar" element={<AdminCalendar />} />
    </Route>
  </Routes>
</BrowserRouter>
);

export default AppRoutes;