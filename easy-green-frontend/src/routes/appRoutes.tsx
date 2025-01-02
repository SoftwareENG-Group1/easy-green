import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
// import CreateAccount from "../pages/auth/createAccount";
import AdminDashboard from "../pages/dashboard/admin/index";
import AdminClient from "../pages/dashboard/admin/client";
import AdminCalendar from "../pages/dashboard/admin/calendar";
import Layout from "../components/layout";
import Form from "../pages/auth/create-account";
import Login from "../pages/auth/login/Login";
import ApplyForLoan from "../pages/loan/LoanApplication";
import UserDashboard from "../pages/dashboard/customer/UserDashboard";
import DashboardLayout from "../pages/dashboard/customer/Layout";
import LoanDashboard from "../pages/dashboard/customer/components_old/LoanDashboard";
import PaymentHistory from "../pages/dashboard/customer/PaymentHistory";
import ProfileSettings from "../pages/dashboard/customer/ProfileOverview";

const AppRoutes = () => (
  <BrowserRouter>
  <Routes>
    {/* Routes without Sidebar */}
    <Route path="/create-account" element={<Form />} />
    <Route path="/" element={<HomePage />} />
			<Route path="/login" element={<Login />} />
			<Route path="/apply-for-loan" element={<ApplyForLoan />} />
  {/* Client Routes with Sidebar */}
      <Route path="/client" element={<DashboardLayout />}>
      <Route index element={<UserDashboard />} /> 
      <Route path="settings" element={<ProfileSettings />} />
      <Route path="loan" element={<LoanDashboard />} />
      <Route path="payment-history" element={<PaymentHistory />} />
      </Route>
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