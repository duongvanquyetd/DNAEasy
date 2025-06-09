import './App.css';
import Home from './component/page/HomePage';
import { LoginPage } from './component/page/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './component/page/register';
import UserProfile from './component/page/UserProfile';
import EditProfile from './component/page/EditProfile';
import Service from './component/page/ServicePage';
import PaternityBookingDetail from './component/page/PaternityBookingDetail';
import MotherChildBookingDetail from './component/page/motherChild';
import AdminDashboard from './component/page/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterForm />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/edit-profile" element={<EditProfile />} />
        <Route path="/service" element={<Service />} />
        <Route path="/service/civil" element={<Service type="civil" />} />
        <Route path="/service/legal" element={<Service type="legal" />} />
        <Route path="/booking/paternity" element={<PaternityBookingDetail />} />
        <Route path="/booking/mother-child" element={<MotherChildBookingDetail />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} /> {/* Fallback route */}
      </Routes>     
    </BrowserRouter>
  );
}

export default App;