import './App.css';
import Home from './component/page/HomePage';
import Service from './component/page/ServicePage'; // Updated to match the correct file name
import { LoginPage } from './component/page/login';
import RegisterForm from './component/page/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaternityBookingDetail from './component/page/PaternityBookingDetail';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;