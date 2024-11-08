import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/admin/Dashboard';
import HomePage from '../pages/HomePage';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Add additional routes here */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;