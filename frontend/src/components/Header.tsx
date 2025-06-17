import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'; // Thêm NavDropdown
import '../App.css';
import { useNavigate } from 'react-router-dom';

// Định nghĩa interface cho Province
interface Province {
  id: string | number;
  name: string;
}

// Định nghĩa type cho activeTab
type Tab = 'tours' | 'khach-san' | 've-vui-choi' |'gioi-thieu' | 'blog';

// Định nghĩa props cho Header
interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}
interface JwtPayload {
  fullName?: string;
  sub?: string;  // thường là username/email trong sub
  roles?: string[];
  id?: string;
}
function Header({ activeTab, setActiveTab }: HeaderProps) {
  // State để lưu danh sách provinces từ API
  const [provinces, setProvinces] = useState<Province[]>([]);
 const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  // Hàm decode JWT payload bằng base64 thủ công
  function parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }
    const handleProfile = () => {
    navigate('/profile');
  };
useEffect(() => {
    // Fetch tỉnh/thành
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://open.oapi.vn/location/provinces?page=0');
        const data = await response.json();
        if (data.code === 'success') {
          setProvinces(data.data);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();

    // Lấy token và decode
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decoded = parseJwt(token);

      if (decoded) {
        if (decoded.fullName) {
          setUserName(decoded.fullName);
        } else if (decoded.sub) {
          setUserName(decoded.sub);
          console.log(decoded.sub)
           setIsLoggedIn(true);
        } else {
          setUserName('User');
        }
      } else {
        console.error('Token decode error: payload null');
        setUserName('User');
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
    console.log('isLoggedIn:', isLoggedIn);
console.log('userName:', userName);
  }, []);

 const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };
const handleTabClick = (tab: Tab) => {
  setActiveTab(tab);
  window.location.hash = tab; // Cập nhật hash trong URL
};

  return (
    <div className="App">
      {/* Header */}
      <Navbar
        bg="primary"
        className="header sticky-top"
        variant="dark"
        expand="lg"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#007bff',
          borderBottom: '1px solid #e0e0e0',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '0.5rem 1rem',
        }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img src="https://www.ivivu.com/du-lich/content/img/logo.svg" alt="IVIVU Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
          
              <Nav.Link
                href="/#tours"
                onClick={() => handleTabClick('tours')}
                active={activeTab === 'tours'}
              >
                Tours
              </Nav.Link>
             
              <Nav.Link href="/#blog"  onClick={() => handleTabClick('blog')}>Blog</Nav.Link>
              <Nav.Link href="/#gioi-thieu"  onClick={() => handleTabClick('gioi-thieu')}
                active={activeTab === 'gioi-thieu'}>Giới thiệu</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#contact" className="text-white">
                <i className="bi bi-telephone-fill"></i> (028) 3933 8002
              </Nav.Link>
              <Nav.Link href="#location" className="text-white">
                <i className="bi bi-geo-alt-fill"></i> Hồ Chí Minh
              </Nav.Link>
              {/* Thêm icon user và dropdown */}
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
                  <NavDropdown.ItemText className="text-center">
                    Xin chào, {userName}
                  </NavDropdown.ItemText>
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
                  <NavDropdown.Item href="/register" className="text-center">
                    <span className="btn btn-info w-100">Đăng ký</span>
                  </NavDropdown.Item>
                  <NavDropdown.ItemText className="text-center">
                    Quý khách đã có tài khoản?
                  </NavDropdown.ItemText>
                  <NavDropdown.Item href="/login" className="text-center text-info">
                    Đăng nhập ngay
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;