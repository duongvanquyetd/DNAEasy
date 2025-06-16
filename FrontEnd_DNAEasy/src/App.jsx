import './App.css';
import Home from './component/page/HomePage';
import LoginPage from './component/page/login.jsx'; // Changed to default import
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './component/page/register';
import UserProfile from './component/page/UserProfile';
import EditProfile from './component/page/EditProfile';
import Service from './component/page/ServicePage';
import Blog from './component/page/BlogPage';
import ServiceDetail from './component/page/ServiceDetail';
import { VNPayReturn } from './component/page/VnpayReturn';
import { YourAppointment } from './component/page/YourAppointment';
import { BookingServicePage } from './component/page/BookingService';
import { HistoryBooking } from './component/page/HistoryBooking';
import AdminDashboard from './component/page/AdminDashboard';
import BlogDetail from './component/page/BlogDetail.jsx';
// import ManageBlog from './component/page/ManageBlog.jsx';
// import ManageService from './component/page/ManageService.jsx';

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
        <Route path="/service/:serviceId" element={<ServiceDetail />} />
        <Route path="/service/:type" element={<Service />} />
        <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:blogId" element={<BlogDetail />} />
        <Route path="/booking/:id" element={<BookingServicePage />} />
        <Route path="/vnpay-outcome" element={<VNPayReturn />} />
        <Route path="/YourAppointment" element={<YourAppointment />} />
        <Route path="/HistoryBooking" element={<HistoryBooking />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        {/* <Route path="/manager/blog" element={<ManageBlog />} />
        <Route path="/manager/service" element={<ManageService />} /> */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;