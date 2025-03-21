import  { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown, } from 'react-bootstrap';
import '../App.css';



function Header() {
 // State to manage the active tab

 // State to store provinces from API
 const [provinces, setProvinces] = useState([]);




 // Fetch provinces from API when component mounts
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

  return (
    <div className="App ">
      {/* Header */}
      <Navbar bg="primary" className='header sticky-top' variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img src="https://www.ivivu.com/du-lich/content/img/logo.svg" alt="IVIVU Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/#khach-san"
              
              >
                Khách sạn
              </Nav.Link>
              <Nav.Link
                href="/#tours"
                
              >
                Tours
              </Nav.Link>
           
              <Nav.Link
                href="/#ve-vui-choi"
              
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