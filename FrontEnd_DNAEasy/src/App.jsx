import './App.css';
import Home from './component/page/HomePage';
import Service from './component/page/ServicePage'; // Updated to match the correct file name
import { LoginPage } from './component/page/login';
import RegisterForm from './component/page/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaternityBookingDetail from './component/page/PaternityBookingDetail';
import { BookingServicePage } from './component/page/BookingService';
import { VNPayReturn } from './component/page/VnpayReturn';
import { YourAppointment } from './component/page/YourAppointment';
import { HistoryBooking } from './component/page/HistoryBooking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterForm />} />
        <Route path="/service/civil" element={<Service type="civil" />} />
        <Route path="/service/legal" element={<Service type="legal" />} />
        <Route path="/booking/paternity" element={<PaternityBookingDetail />} />
        <Route path="/booking/:id" element={<BookingServicePage />} />
        <Route path="/vnpay-callback" element={<VNPayReturn />} />
        <Route path="/yourappoinment" element={<YourAppointment />} />
        <Route path="/historyBooking" element={<HistoryBooking />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;