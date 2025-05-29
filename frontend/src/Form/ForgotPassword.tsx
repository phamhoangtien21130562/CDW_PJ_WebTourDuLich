import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../assets/css/forgot-password.css';
import Header from '../components/HeaderUer';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await fetch(`http://localhost:8080/users/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Lỗi khi gửi yêu cầu quên mật khẩu');
      }

      const data = await response.text();
      setSuccessMsg(data || 'Mật khẩu mới đã được gửi vào email của bạn.');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Lỗi mạng, vui lòng thử lại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <Container className="forgot-password-container d-flex align-items-center justify-content-center min-vh-100">
        <div className="forgot-password-box shadow-sm p-4 bg-white rounded" style={{ maxWidth: 400, width: '100%' }}>
          <div className="d-flex align-items-center mb-4">
            <Button variant="link" onClick={() => navigate(-1)} className="text-muted p-0 me-3">
              <FaArrowLeft />
            </Button>
            <h2 className="w-100 text-center mb-0">Quên mật khẩu</h2>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {successMsg && <Alert variant="success">{successMsg}</Alert>}

          <p className="text-muted text-center mb-4">
            Vui lòng nhập email Quý khách đã đăng ký với iVIVU
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="warning" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Đang xử lý...
                </>
              ) : (
                'Kích hoạt lại mật khẩu'
              )}
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
