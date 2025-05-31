import './App.css';
import Home from './component/page/HomePage';
import Service from './component/page/ServicePage'; // Updated to match the correct file name
import { LoginPage } from './component/page/login';
import RegisterForm from './component/page/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;