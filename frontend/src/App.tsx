
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import Index from './pages/users/Home';
import HotelDetail from './pages/users/HotelDetail';
import TourDetail from './pages/users/TourDetail';

import TicketDetail from './pages/users/TicketDetail';

import Profile from './pages/users/Profile';

import AdminRouter from "./router/AdminRouter";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import ForgotPassword from './form/ForgotPassword';
import RegisterForm from './form/Register';
import LoginForm from './form/LoginForm';
import ChatWidget from './components/ChatWidget';



function App() {
  return (
   <div>
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
        <Route path="/profile" element={<Profile/>} />
      {/*  Admin*/}
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
         <ChatWidget  />
   </div>
  );
}

export default App;