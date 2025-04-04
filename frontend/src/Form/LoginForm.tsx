import React, { Component, ChangeEvent, FormEvent } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import '../assets/css/login.css';
import Header from '../components/HeaderUer';

interface LoginFormProps {}

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
}

class LoginForm extends Component<LoginFormProps, LoginFormState> {
  state: LoginFormState = {
    email: '',
    password: '',
    showPassword: false,
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

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log('Email:', email);
    console.log('Password:', password);
    this.setState({ email: '', password: '' });
  };

  render() {
    const { email, password, showPassword } = this.state;

    return (
      <div >

        <Header/>
        <div className="login-form-container">
        <h3 className="text-center mb-4">Đăng nhập</h3>
        <Form onSubmit={this.handleSubmit}>
          {/* Email / Số điện thoại */}
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email / Số điện thoại di động</Form.Label>
            <Form.Control
              type="text"
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
                className="input-field w-100" // Thêm class để kiểm soát chiều rộng
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
      </div>
    );
  }
}

export default LoginForm;