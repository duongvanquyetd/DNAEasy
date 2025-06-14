import './App.css';
import Home from './component/page/HomePage';
import { LoginPage } from './component/page/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './component/page/register';
import UserProfile from './component/page/UserProfile';
import EditProfile from './component/page/EditProfile';
import Service from './component/page/ServicePage';
import Blog from './component/page/BlogPage';
import  {VNPayReturn} from './component/page/VnpayReturn';
import  {YourAppointment}  from './component/page/YourAppointment';
import  {BookingServicePage}  from './component/page/BookingService';
import  {HistoryBooking}  from './component/page/HistoryBooking';
import { Test } from './component/page/test';
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/service/:type" element={<Service />} /> {/* Dynamic route */}
        <Route path="/service" element={<Service />} /> {/* Default without type */}
        <Route path="/booking/:id" element={<BookingServicePage />} />
        <Route path="/vnpay-callback" element={<VNPayReturn />} />
        <Route path="/yourappoinment" element={<YourAppointment />} />
        <Route path="/historyBooking" element={<HistoryBooking />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} /> {/* Fallback route */}
         <Route path="/test/:token" element={<Test />} />
      </Routes>     
    </BrowserRouter>
  );
}

export default App;