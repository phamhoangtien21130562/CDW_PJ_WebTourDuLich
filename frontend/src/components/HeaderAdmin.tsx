import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type Tab = 'users' | 'orders' | 'travel' | 'category';

interface HeaderProps {}

interface JwtPayload {
  fullName?: string;
  sub?: string;
  roles?: string[];
  id?: string;
}

const Header: React.FC<HeaderProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm decode JWT
  function parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  // Lấy active tab từ URL pathname
  const getActiveTab = (): Tab => {
    if (location.pathname.startsWith('/admin/users')) return 'users';
    if (location.pathname.startsWith('/admin/orders')) return 'orders';
    if (location.pathname.startsWith('/admin/travel')) return 'travel';
     if (location.pathname.startsWith('/admin/category')) return 'category';
    return 'users'; // default
  };

  const [activeTab, setActiveTab] = useState<Tab>(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = parseJwt(token);
      if (decoded) {
        if (decoded.fullName) setUserName(decoded.fullName);
        else if (decoded.sub) setUserName(decoded.sub);
        else setUserName('User');
      } else {
        setUserName('User');
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/login'); // Redirect về trang login hoặc trang chủ
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      style={{
        borderBottom: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0.5rem 1rem',
        zIndex: 1000,
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="https://www.ivivu.com/du-lich/content/img/logo.svg"
            alt="IVIVU Logo"
            style={{ marginRight: '20px' }}
          />
          <Nav className="d-flex">
            <Nav.Link
              as={Link}
              to="/admin/users"
              className={`fw-semibold px-3 menu-link ${activeTab === 'users' ? 'active' : ''}`}
            >
              Người dùng
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/orders"
              className={`fw-semibold px-3 menu-link ${activeTab === 'orders' ? 'active' : ''}`}
            >
              Đơn hàng
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/tours"
              className={`fw-semibold px-3 menu-link ${activeTab === 'travel' ? 'active' : ''}`}
            >
           Travel
            </Nav.Link>
             <Nav.Link
              as={Link}
              to="/admin/category"
              className={`fw-semibold px-3 menu-link ${activeTab === 'category' ? 'active' : ''}`}
            >
             Danh mục
            </Nav.Link>
            {/*<Nav.Link*/}
            {/*    as={Link}*/}
            {/*    to="/admin/hotels"*/}
            {/*    className={`fw-semibold px-3 menu-link ${activeTab === 'tours' ? 'active' : ''}`}*/}
            {/*>*/}
            {/*  Khách sạn*/}
            {/*</Nav.Link>*/}
          </Nav>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#contact" className="text-white me-3">
              <i className="bi bi-telephone-fill"></i> (028) 3933 8002
            </Nav.Link>
            <Nav.Link href="#location" className="text-white me-3">
              <i className="bi bi-geo-alt-fill"></i> Hồ Chí Minh
            </Nav.Link>

            {isLoggedIn ? (
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-person-circle text-white"></i> {userName}
                  </>
                }
                id="user-dropdown"
                align="end"
                className="text-white"
              >
                <NavDropdown.ItemText className="text-center">Xin chào, {userName}</NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleProfile} className="text-center text-info">
                  Thông tin cá nhân
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout} className="text-center text-danger">
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown
                title={<i className="bi bi-person-circle text-white"></i>}
                id="user-dropdown"
                align="end"
                className="text-white"
              >
                <NavDropdown.Item as={Link} to="/register" className="text-center">
                  <span className="btn btn-info w-100">Đăng ký</span>
                </NavDropdown.Item>
                <NavDropdown.ItemText className="text-center">Quý khách đã có tài khoản?</NavDropdown.ItemText>
                <NavDropdown.Item as={Link} to="/login" className="text-center text-info">
                  Đăng nhập ngay
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* CSS nội bộ */}
      <style>
        {`
          .menu-link {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.75);
            transition: color 0.3s ease-in-out;
          }
          .menu-link:hover {
            color: #ffffff;
          }
          .menu-link.active {
            color: #ffffff !important;
            font-weight: bold;
          }
        `}
      </style>
    </Navbar>
  );
};

export default Header;
