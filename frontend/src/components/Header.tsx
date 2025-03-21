import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'; // Thêm NavDropdown
import '../App.css';

// Định nghĩa interface cho Province
interface Province {
  id: string | number;
  name: string;
}

// Định nghĩa type cho activeTab
type Tab = 'tours' | 'khach-san' | 've-vui-choi';

// Định nghĩa props cho Header
interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

function Header({ activeTab, setActiveTab }: HeaderProps) {
  // State để lưu danh sách provinces từ API
  const [provinces, setProvinces] = useState<Province[]>([]);

  // Lấy provinces từ API khi component mount
  useEffect(() => {
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
  }, []);

  // Hàm xử lý khi click vào tab
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
          <Navbar.Brand href="#home">
            <img src="https://www.ivivu.com/du-lich/content/img/logo.svg" alt="IVIVU Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/#khach-san"
                onClick={() => handleTabClick('khach-san')}
                active={activeTab === 'khach-san'}
              >
                Khách sạn
              </Nav.Link>
              <Nav.Link
                href="/#tours"
                onClick={() => handleTabClick('tours')}
                active={activeTab === 'tours'}
              >
                Tours
              </Nav.Link>
              <Nav.Link
                href="/#ve-vui-choi"
                onClick={() => handleTabClick('ve-vui-choi')}
                active={activeTab === 've-vui-choi'}
              >
                Vé vui chơi
              </Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>
              <Nav.Link href="#gioi-thieu">Giới thiệu</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#contact" className="text-white">
                <i className="bi bi-telephone-fill"></i> (028) 3933 8002
              </Nav.Link>
              <Nav.Link href="#location" className="text-white">
                <i className="bi bi-geo-alt-fill"></i> Hồ Chí Minh
              </Nav.Link>
              {/* Thêm icon user và dropdown */}
              <NavDropdown
                title={<i className="bi bi-person-circle text-white"></i>} // Icon user
                id="user-dropdown"
                align="end" // Căn chỉnh dropdown sang phải
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;