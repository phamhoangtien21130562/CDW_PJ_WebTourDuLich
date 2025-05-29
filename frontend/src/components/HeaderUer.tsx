import { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '../App.css';
import { useNavigate } from 'react-router-dom';

interface JwtPayload {
  fullName?: string;
  sub?: string;  // thường là username/email trong sub
  roles?: string[];
  id?: string;
}

function Header() {
  const [provinces, setProvinces] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

 const navigate = useNavigate();
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
  const handleProfile = () => {
    navigate('/profile');
  };
  return (
    <div className="App">
      <Navbar bg="primary" className="header sticky-top" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img src="https://www.ivivu.com/du-lich/content/img/logo.svg" alt="IVIVU Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Các nav link khác */}
            </Nav>
            <Nav>
              <Nav.Link href="#contact" className="text-white">
                <i className="bi bi-telephone-fill"></i> (028) 3933 8002
              </Nav.Link>
              <Nav.Link href="#location" className="text-white">
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
