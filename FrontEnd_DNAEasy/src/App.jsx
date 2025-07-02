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
import { YourAppointment } from './component/page/YourAppointment';
import { BookingServicePage } from './component/page/BookingService';
import { HistoryBooking } from './component/page/HistoryBooking';
import { Payment } from './component/page/payment';
import AdminDashboard from './component/page/AdminDashboard';
import BlogDetail from './component/page/BlogDetail.jsx';
import ManageBlog from './component/page/ManageBlog';
import ManageService from './component/page/ManageService';
import { AssignStaff } from './component/page/AssignStaff.jsx';
import RevenueChart from './component/page/RevenueChart.jsx';
import { ManageComment } from './component/page/ManageComment.jsx';
import UserAdminDashboard from "./component/page/AdminUser.jsx";
import DNATestingAdminDashboard from './component/page/AdminAppointment.jsx';
import AdminRevenue from './component/page/AdminRevenue.jsx';



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
        <Route path="/payment" element={<Payment />} />
        <Route path="/YourAppointment" element={<YourAppointment />} />
        <Route path="/HistoryBooking" element={<HistoryBooking />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminDashboard/analytics" element={<AdminDashboard key="analytics" />} />
        <Route path="/ManageBlog" element={<ManageBlog />} />
        <Route path="/ManageService" element={<ManageService />} />
        <Route path="/assign-staff" element={<AssignStaff />} />

        <Route path="/revenue" element={<RevenueChart />} />

        <Route path="/ManageComment" element={<ManageComment />} />
        <Route path="/user-admin-dashboard" element={<UserAdminDashboard />} />
        <Route path="/AdminAppoinment" element={<DNATestingAdminDashboard />} />
        <Route path="/AdminRevenue" element={<AdminRevenue />}/>
        <Route path="/Notification" element={<UserAdminDashboard />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;