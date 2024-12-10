import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
// import CreateAccount from "../pages/auth/createAccount";
import AdminDashboard from "../pages/dashboard/admin/index";
import AdminClient from "../pages/dashboard/admin/client";
import AdminCalendar from "../pages/dashboard/admin/calendar";
import Layout from "../components/layout";
import Form from "../pages/auth/MultiStepForm";

const AppRoutes = () => (
  <BrowserRouter>
  <Routes>
    {/* Routes without Sidebar */}
    <Route path="/" element={<HomePage />} />
    <Route path="/create-account" element={<Form />} />

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