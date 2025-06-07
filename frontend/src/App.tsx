
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
import AddTourForm from './components/admin/AddTourForm';
import EditTour from './components/admin/EditTour';
import { Provider } from 'react-redux';
import store from './redux/store';
import PrivateRoute from './PrivateRoute';



function App() {
  return (
   <div>
       <Provider store={store}>
     <Router>
      <Routes>
        {/* Trang danh sách khách sạn */}
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Index />} />
        {/* Trang chi tiết khách sạn */}
        <Route path="/hotel" element={<HotelDetail />} />
        <Route path="/tour-detail/:id" element={<TourDetail />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/ticket-detail" element={<TicketDetail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile/>} />
           <Route path="/addtour" element={<PrivateRoute roles={['ROLE_ADMIN']}><AddTourForm /></PrivateRoute>} />
          
          {/*  Admin */}
          <Route path="/admin/*" element={<PrivateRoute roles={['ROLE_ADMIN']}><AdminRouter /></PrivateRoute>} />
          <Route path="/admin/tours/edit/:id" element={<PrivateRoute roles={['ROLE_ADMIN']}><EditTour /></PrivateRoute>} />
      </Routes>
    </Router>
         <ChatWidget  />
         </Provider>
   </div>
  );
}

export default App;