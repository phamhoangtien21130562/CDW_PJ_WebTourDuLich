import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap';
import '../assets/css/login.css';
import Header from '../components/HeaderUer';
import { NavigateFunction, } from 'react-router-dom';
import axios from 'axios';
import { withNavigation } from '../utils/withNavigation';
interface LoginFormProps {
  navigate: NavigateFunction;
}

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
  showToast: boolean;
  toastMessage: string;
  toastVariant: 'success' | 'danger';
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {

  state: LoginFormState = {
    email: '',
    password: '',
    showPassword: false,
    showToast: false,
    toastMessage: '',
    toastVariant: 'success',
  };
showToast = (message: string, variant: 'success' | 'danger') => {
  this.setState({
    showToast: true,
    toastMessage: message,
    toastVariant: variant,
  });
};
  handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  toggleShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

    handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        email: email,
        password: password,
      });
  const data = response.data;
   if (data.token) {
      localStorage.setItem('token', data.token);
    }
        if (data.roles && data.roles[0]) {
        localStorage.setItem('userRole', data.roles[0]);  // Lưu vai trò đầu tiên vào 'userRole'
      }
      this.showToast(response.data, 'success');
      this.setState({ email: '', password: '' });

  if (data.roles.includes('ROLE_ADMIN')) {
      this.props.navigate('/admin');
    } else if (data.roles.includes('ROLE_USER')) {
      this.props.navigate('/home');
    } else {
      // Nếu không có role nào phù hợp, chuyển sang trang mặc định
      this.props.navigate('/');
    }
    } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data || '❌ Đăng nhập thất bại.';
    this.showToast(message, 'danger');
  } 
}
  };

  render() {
    const {
      email,
      password,
      showPassword,
      showToast,
      toastMessage,
      toastVariant,
    } = this.state;

    return (
      <div >

        <Header/>
        <div className="login-form-container">
        <h3 className="text-center mb-4">Đăng nhập</h3>
        <Form onSubmit={this.handleSubmit}>
          {/* Email / Số điện thoại */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              placeholder=""
              value={email}
              onChange={this.handleEmailChange}
              required
              className="w-100 input-field" // Thêm class để kiểm soát chiều rộng
            />
          </Form.Group>

          {/* Mật khẩu */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
          
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder=""
                value={password}
                onChange={this.handlePasswordChange}
                required
                className="input-field w-100" 
              />
            
           
            <div className="d-flex justify-content-between mt-2">
              <a href="/forgot-password" className="text-primary">
                Quên mật khẩu?
              </a>
            
            </div>
          </Form.Group>

          {/* Nút Đăng nhập */}
         <Button variant="warning" type="submit" className="w-100 mb-3">
            Đăng nhập
          </Button>

          {/* Đường phân cách */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="px-2 text-muted">Hoặc</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Đăng nhập bằng Facebook/Google */}
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-primary"
              className="w-48 d-flex align-items-center justify-content-center"
              onClick={() => console.log('Đăng nhập bằng Facebook')}
            >
              <i className="bi bi-facebook me-2"></i> Facebook
            </Button>
            <Button
              variant="outline-danger"
              className="w-48 d-flex align-items-center justify-content-center"
              onClick={() => console.log('Đăng nhập bằng Google')}
            >
              <i className="bi bi-google me-2"></i> Google
            </Button>
          </div>
        </Form>
      </div>
       <ToastContainer  position="top-end" className="p-3">
          <Toast
            onClose={() => this.setState({ showToast: false })}
            show={showToast}
            delay={3000}
            autohide
            bg={toastVariant}
          >
            <Toast.Body className="text-white">{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  }
}

export default withNavigation(LoginForm);