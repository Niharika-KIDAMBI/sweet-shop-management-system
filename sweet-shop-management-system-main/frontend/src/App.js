import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import AdminPanel from './pages/AdminPanel';
import CustomerSweets from './pages/CustomerSweets';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/AdminOrders';
import { getToken, isAdmin } from './utils/auth';

const PrivateRoute = ({ children }) =>
  getToken() ? children : <Navigate to="/" />;

const AdminRoute = ({ children }) =>
  isAdmin() ? children : <Navigate to="/menu" />;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/menu" element={<PrivateRoute><Menu /></PrivateRoute>} />
        <Route path="/sweets" element={<PrivateRoute><CustomerSweets /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />

        <Route path="/admin/orders"
  element={<AdminRoute><AdminOrders /></AdminRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
