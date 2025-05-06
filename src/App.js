import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AllEvents from './pages/AllEvents';
import MyEvents from './pages/MyEvents';
import Settings from './pages/Settings';
import CreateEvent from './pages/CreateEvent';
import ManageEvents from './pages/ManageEvents';
import ManageUsers from './pages/ManageUsers';
import AccessDenied from './pages/AccessDenied';
import NotFound from './pages/NotFound';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute'; // <<== Make sure the path is correct

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      {/* Protected Routes */}
      <Route path="/all-events" element={
        <PrivateRoute>
          <AllEvents />
        </PrivateRoute>
      } />
      <Route path="/my-events" element={
        <PrivateRoute>
          <MyEvents />
        </PrivateRoute>
      } />
      <Route path="/settings" element={
        <PrivateRoute>
          <Settings />
        </PrivateRoute>
      } />
      <Route path="/create-event" element={
        <PrivateRoute>
          <CreateEvent />
        </PrivateRoute>
      } />
      <Route path="/manage-events" element={
        <PrivateRoute>
          <ManageEvents />
        </PrivateRoute>
      } />
      <Route path="/manage-users" element={
        <PrivateRoute>
          <ManageUsers />
        </PrivateRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;