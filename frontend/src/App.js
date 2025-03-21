import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import './App.css';
import Hotels from './components/Hotel';

function App() {
 // State to manage the active tab
 const [activeTab, setActiveTab] = useState('tours'); // Default to 'tours'
 // State to store provinces from API
 const [provinces, setProvinces] = useState([]);
 // State to store selected province
 const [selectedProvince, setSelectedProvince] = useState('');

 // Define background images for each tab
 const backgroundImages = {
   'tours': 'https://cdn2.ivivu.com/2025/02/19/14/tour-nhatban-5n4d-banner-20250219.png',
   'khach-san': 'https://cdn1.ivivu.com/images/2025/03/06/18/sixsense_nvb-t_10m7fe_.webp', // Ví dụ URL, thay bằng ảnh thực tế
   've-vui-choi': 'https://cdn1.ivivu.com/images/2024/11/05/12/=utf-8BQmFubmVyIFRvcCBWw6kgVnVpIGNoxqFpNCAoMTkyMHg1MTMpICgxKS5wbmdfMC5wbmc==_.webp', // Ví dụ URL, thay bằng ảnh thực tế
 };

 // Function to handle tab click
 const handleTabClick = (tab) => {
   setActiveTab(tab);
 };

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
    <div className="App">
      {/* Header */}
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#home">
            <img src="https://www.ivivu.com/du-lich/content/img/logo.svg" alt="IVIVU Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="#khach-san"
                onClick={() => handleTabClick('khach-san')}
                active={activeTab === 'khach-san'}
              >
                Khách sạn
              </Nav.Link>
              <Nav.Link
                href="#tours"
                onClick={() => handleTabClick('tours')}
                active={activeTab === 'tours'}
              >
                Tours
              </Nav.Link>
           
              <Nav.Link
                href="#ve-vui-choi"
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImages[activeTab] || backgroundImages['tours']})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Container>
          <Row className="justify-content-start">
            <Col xs={12} md={6}>
              <h1 className="text-white">
                {activeTab === 'khach-san'
                  ? 'Trải nghiệm kỳ nghỉ tuyệt vời'
                  : activeTab === 've-vui-choi'
                  ? 'Vui chơi & Giải trí'
                  : 'Thẻ giới tour trong tay bạn'}
              </h1>
              <p className="text-white">
                {activeTab === 'khach-san'
                  ? 'Combo khách sạn - vé máy bay - đưa đón sân bay giá tốt nhất'
                  : activeTab === 've-vui-choi'
                  ? 'Vé vào cổng, trò chơi, ưu đãi hấp dẫn'
                  : 'Phục vụ tận tâm, giá siêu ưu đãi'}
              </p>
              <div className="deal-badge">
                <span>⚡ 120 Khách đặt trong 24h</span>
              </div>

              {/* Conditionally Render Search Form Based on Active Tab */}
              {activeTab === 'khach-san' ? (
                // Hotel Search Form
                <div>
                       <Form className="search-form mt-4">
                  <Row className="g-2 align-items-center">
                    <Col xs={12} md={12}>
                      <FormControl
                        placeholder="Bạn muốn đi đâu?"
                        className="rounded-0"
                      />
                    </Col>
                    <Col xs={6} md={2}>
                      <FormControl
                        type="date"
                        placeholder="Thứ tư"
                        className="rounded-0"
                      />
                    </Col>
                    <Col xs={6} md={2}>
                      <FormControl
                        type="date"
                        placeholder="Thứ năm"
                        className="rounded-0"
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FormControl
                        placeholder="2 người lớn, 0 trẻ em"
                        className="rounded-0"
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <FormControl
                        placeholder="1 phòng"
                        className="rounded-0"
                      />
                    </Col>
                    <Col xs={12} md={2}>
                      <Button variant="warning" className="w-100 rounded-0">
                        Tìm
                      </Button>
                    </Col>
                  </Row>
                </Form>
                
                </div>
           
              


              ) : activeTab === 'tours' ? (
                // Tour Search Form
                <Form className="search-form mt-4">
                  <Row className="g-2 align-items-center">
                    <Col xs={12} md={4}>
                      <FormControl
                        placeholder="Bạn muốn đi đâu?"
                        className="rounded-0"
                      />
                    </Col>
                    <Col xs={12} md={3}>
                      <FormControl
                        type="date"
                        placeholder="Ngày khởi hành"
                        className="rounded-0"
                      />
                    </Col>
                    <Col xs={12} md={5}>
                      <Form.Select
                        value={selectedProvince}
                        onChange={(e) => setSelectedProvince(e.target.value)}
                        className="rounded-0"
                      >
                        <option value="">Khởi hành từ</option>
                        {provinces.map((province) => (
                          <option key={province.id} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    
                    <Col xs={12} md={2}>
                      <Button variant="warning" className="w-100 rounded-0">
                        Tìm
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : activeTab === 've-vui-choi' ? (
                // Entertainment Ticket Search Form
                <Form className="search-form mt-4">
                  <Row className="g-2 align-items-center">
                    <Col xs={12} md={12}>
                      <FormControl
                        placeholder="Địa điểm vui chơi?"
                        className="rounded-0"
                      />
                    </Col>
                 
                    <Col xs={12} md={2}>
                      <Button variant="warning" className="w-100 rounded-0">
                        Tìm
                      </Button>
                    </Col>
                  </Row>
                </Form>
              ) : null}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Highlight Section */}
      <Container className="highlight-section">
        <Row className="text-center">
          <Col xs={12} md={4}>
            <i className="bi bi-geo-alt-fill highlight-icon"></i>
            <h5>1.000+ tours</h5>
            <p>Chất lượng trong và ngoài nước</p>
          </Col>
          <Col xs={12} md={4}>
            <i className="bi bi-chat-heart-fill highlight-icon"></i>
            <h5>10K+ đánh giá 5 sao</h5>
            <p>Từ những khách hàng đã tour</p>
          </Col>
          <Col xs={12} md={4}>
            <i className="bi bi-shield-check highlight-icon"></i>
            <h5>100+ ưu đãi mỗi ngày</h5>
            <p>Cho khách đặt sớm, theo nhóm</p>
          </Col>
        </Row>
      </Container>

      {activeTab === 'khach-san' ? (
                // Hotel Search Form
                <div>
                  
                  <Hotels></Hotels>
                </div>
           
              


              ) : activeTab === 'tours' ? (
                // Tour Search Form
               <div></div>
              ) : activeTab === 've-vui-choi' ? (
                // Entertainment Ticket Search Form
                <Form className="search-form mt-4">
               
                </Form>
              ) : null}
    </div>
  );
}

export default App;