// components/ForgotPassword.tsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../assets/css/forgot-password.css';
import Header from '../components/HeaderUer';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here (e.g., API call to send reset email)
    console.log('Email:', email);
    // Navigate to a confirmation page or back to login after submission
    navigate('/login');
  };

  return (
  <div>
    <Header/>
    <Container className="forgot-password-container d-flex align-items-center justify-content-center min-vh-100">
      <div className="forgot-password-box shadow-sm p-4 bg-white rounded">
        <div className="d-flex align-items-center mb-4">
          <Button variant="link" onClick={() => navigate(-1)} className="text-muted p-0 me-3">
            <FaArrowLeft />
          </Button>
          <h2 className="w-100 text-center mb-0">Quên mật khẩu</h2>
        </div>
        <p className="text-muted text-center mb-4">
          Vui lòng nhập email Quý khách đã đăng ký với iVIVU
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>


          <Button variant="warning" type="submit" className="w-100">
            Kích hoạt lại mật khẩu
          </Button>
        </Form>
      </div>
    </Container>
  </div>
  );
};

export default ForgotPassword;