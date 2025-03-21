
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import Index from './pages/users/Home';
import HotelDetail from './pages/users/HotelDetail';
import TourDetail from './pages/users/TourDetail';
import LoginForm from './Form/LoginForm';
import RegisterForm from './Form/Register';
import TicketDetail from './pages/users/TicketDetail';
import ForgotPassword from './Form/ForgotPassword';


function App() {
  return (
    <Router>
      <Routes>
        {/* Trang danh sách khách sạn */}
        <Route path="/" element={<Index />} />
        {/* Trang chi tiết khách sạn */}
        <Route path="/hotel" element={<HotelDetail />} />
        <Route path="/tour-detail" element={<TourDetail />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/ticket-detail" element={<TicketDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;