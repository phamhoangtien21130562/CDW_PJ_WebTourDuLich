import React, { useEffect, useState } from 'react';
import { Container, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
import '../../App.css';
import Hotels from '../../components/Hotel';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Tour from '../../components/Tour';
import EntertainmentTickets from './EntertainmentTickets';


// Định nghĩa interface cho Province
interface Province {
  id: string | number;
  name: string;
}

// Định nghĩa các giá trị hợp lệ cho activeTab
type Tab = 'tours' | 'khach-san' | 've-vui-choi';

function Index() {
  // State cho activeTab với kiểu Tab
  const [activeTab, setActiveTab] = useState<Tab>('tours');
  // State cho danh sách provinces
  const [provinces, setProvinces] = useState<Province[]>([]);
  // State cho tỉnh được chọn
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [guestSelection, setGuestSelection] = useState<string>('2 người lớn, 0 trẻ em'); // State để lưu giá trị được chọn

  const handleGuestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGuestSelection(e.target.value);
  };
  // Định nghĩa backgroundImages với các key cụ thể
  const backgroundImages: {
    tours: string;
    'khach-san': string;
    've-vui-choi': string;
  } = {
    tours: 'https://cdn2.ivivu.com/2025/02/19/14/tour-nhatban-5n4d-banner-20250219.png',
    'khach-san': 'https://cdn1.ivivu.com/images/2025/03/06/18/sixsense_nvb-t_10m7fe_.webp',
    've-vui-choi': 'https://cdn1.ivivu.com/images/2024/11/05/12/=utf-8BQmFubmVyIFRvcCBWw6kgVnVpIGNoxqFpNCAoMTkyMHg1MTMpICgxKS5wbmdfMC5wbmc==_.webp',
  };

  // Cập nhật activeTab dựa trên URL hash khi component mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (hash && (['khach-san', 'tours', 've-vui-choi'] as Tab[]).includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Lắng nghe thay đổi hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Tab;
      if (hash && (['khach-san', 'tours', 've-vui-choi'] as Tab[]).includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Lấy danh sách provinces từ API
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
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Search Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${backgroundImages[activeTab] || backgroundImages.tours})`,
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
              <div className={activeTab === 'khach-san' ? 'deal-badge' : ''}>
                {activeTab === 'khach-san' ? <span>⚡ 120 Khách đặt trong 24h</span> : null}
              </div>

              {/* Conditionally Render Search Form Based on Active Tab */}
              {activeTab === 'khach-san' ? (
                <div>
                  <Form className="search-form mt-4">
                    <Row className="g-2 align-items-center">
                      <Col xs={12} md={12}>
                        <FormControl placeholder="Bạn muốn đi đâu?" className="rounded-0" />
                      </Col>
                      <Col xs={6} md={4}>
                        <FormControl type="date" placeholder="Thứ tư" className="rounded-0" />
                      </Col>
                      <Col xs={6} md={4}>
                        <FormControl type="date" placeholder="Thứ năm" className="rounded-0" />
                      </Col>
                      <Col xs={12} md={4}>
      <Form.Select
        className="rounded-0 start"
        value={guestSelection}
        onChange={handleGuestChange}
        aria-label="Số lượng người lớn và trẻ em"
      >
        <option value="1 người lớn, 0 trẻ em">1 người lớn, 0 trẻ em</option>
        <option value="2 người lớn, 0 trẻ em">2 người lớn, 0 trẻ em</option>
        <option value="2 người lớn, 1 trẻ em">2 người lớn, 1 trẻ em</option>
        <option value="2 người lớn, 2 trẻ em">2 người lớn, 2 trẻ em</option>
        <option value="3 người lớn, 0 trẻ em">3 người lớn, 0 trẻ em</option>
        <option value="3 người lớn, 1 trẻ em">3 người lớn, 1 trẻ em</option>
        {/* Thêm các tùy chọn khác nếu cần */}
      </Form.Select>
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
                <Form className="search-form mt-4">
                  <Row className="g-2 align-items-center">
                    <Col xs={12} md={4}>
                      <FormControl placeholder="Bạn muốn đi đâu?" className="rounded-0" />
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
                        className="rounded-0 start"
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
                <Form className="search-form mt-4">
                  <Row className="g-2 align-items-center">
                    <Col xs={12} md={12}>
                      <FormControl placeholder="Địa điểm vui chơi?" className="rounded-0" />
                    </Col>
                    <Col xs={12} md={4}>
                      <Button variant="warning" className="w-100 rounded-0 button-tall">
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

      {/* Conditionally Render Content */}
      {activeTab === 'khach-san' ? (
        <div>
          <Hotels />
        </div>
      ) : activeTab === 'tours' ? (
        <div>
          <Tour />
        </div>
      ) : activeTab === 've-vui-choi' ? (
    <EntertainmentTickets/>
      ) : null}

      <Footer />
 
    </div>
  );
}

export default Index;