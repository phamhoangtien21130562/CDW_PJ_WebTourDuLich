import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Button, Form, Toast, ToastContainer } from 'react-bootstrap'; // Bỏ import InputGroup
import '../assets/css/register.css';
import Header from '../components/HeaderUer';
import axios from 'axios';

interface RegisterFormProps {}

interface RegisterFormState {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  showToast: boolean;
  toastMessage: string;
  toastVariant: 'success' | 'danger';
}

class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {
  state: RegisterFormState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    showToast: false,
    toastMessage: '',
    toastVariant: 'success',
  };

  handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ fullName: e.target.value });
  };

  handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ confirmPassword: e.target.value });
  };

  toggleShowPassword = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  toggleShowConfirmPassword = () => {
    this.setState((prevState) => ({ showConfirmPassword: !prevState.showConfirmPassword }));
  };

 handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.showToast('❌ Mật khẩu xác nhận không khớp.', 'danger');
      return;
    }

    try {
      await axios.post('http://localhost:8080/users', {
        fullName: fullName,
        emailOrPhone: email,
        password: password,
      });

      this.showToast('✅ Đăng ký thành công!', 'success');

      this.setState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      const message =
        error.response?.data || '❌ Đã xảy ra lỗi trong quá trình đăng ký.';
      this.showToast(message, 'danger');
    }
  };

  showToast = (message: string, variant: 'success' | 'danger') => {
    this.setState({
      showToast: true,
      toastMessage: message,
      toastVariant: variant,
    });
  };

  render() {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      showPassword,
      showConfirmPassword,
      showToast,
      toastMessage,
      toastVariant,
    } = this.state;

  

    return (
    <div>
        <Header></Header>
        <div className="register-form-container">
        <h3 className="text-center mb-4">Đăng ký</h3>
        <Form onSubmit={this.handleSubmit}>
          {/* Họ tên */}
          <Form.Group controlId="formFullName" className="mb-3">
            <Form.Label>
              Họ tên <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ví dụ: Nguyễn Văn A"
              value={fullName}
              onChange={this.handleFullNameChange}
              required
              className="w-100 input-field"
            />
          </Form.Group>

          {/* Email / Số điện thoại */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>
              Email / Số điện thoại di động <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ví dụ: 0901234567 hoặc email@gmail.com"
              value={email}
              onChange={this.handleEmailChange}
              required
              className="w-100 input-field"
            />
          </Form.Group>

          {/* Mật khẩu */}
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>
              Mật khẩu <span className="text-danger">*</span>
            </Form.Label>
            <div className="input-wrapper">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                placeholder=""
                value={password}
                onChange={this.handlePasswordChange}
                required
                className="input-field"
              />
              <i
                className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password-icon`}
                onClick={this.toggleShowPassword}
              ></i>
            </div>
          </Form.Group>

          {/* Xác nhận lại mật khẩu */}
          <Form.Group controlId="formConfirmPassword" className="mb-3">
            <Form.Label>
              Xác nhận lại mật khẩu <span className="text-danger">*</span>
            </Form.Label>
            <div className="input-wrapper">
              <Form.Control
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder=""
                value={confirmPassword}
                onChange={this.handleConfirmPasswordChange}
                required
                className="input-field"
              />
              <i
                className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'} toggle-password-icon`}
                onClick={this.toggleShowConfirmPassword}
              ></i>
            </div>
          </Form.Group>

          {/* Nút Đăng ký */}
          <Button variant="warning" type="submit" className="w-100 mb-3">
            Đăng ký
          </Button>
        </Form>
      </div>
        <ToastContainer position="top-end" className="p-3">
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

export default RegisterForm;