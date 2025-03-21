// TourDetail.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Table, Carousel } from 'react-bootstrap';

import '../../assets/css/tour.css';

import Footer from '../../components/Footer';
import TourCard from '../../components/TourCard';
import Header from '../../components/HeaderUer';

// Sample tour data
const tourData = {
  title: 'Tour Đà Lạt 4N3Đ: HCM - Đà Lạt Tương - Đầm Cao Mỵ - Ngõ Nhật Nguyệt - Thác Phú Đài - Đỉnh Bạc',
  mainImage: 'https://cdn2.ivivu.com/2024/10/14/15/thap-phan-dai-loan-ivv-750x460.gif',
  subImages: [
    'https://cdn2.ivivu.com/2019/03/14/11/ivivu-toa-thap-taipei-101-750x460.jpg',
    'https://cdn2.ivivu.com/2024/10/14/15/thap-phan-dai-loan-ivv-750x460.gif',
    
  ],
  price: '9.990.000 VNĐ',
  duration: '4 Ngày 3 Đêm',
  transport: 'plane',
  highlights: [
    'Phố Cổ Hội An',
    'Bà Nà Hill',
    'Biển Sơn Trà',
    'Rừng Dừa Bảy Mẫu',
  ],
  itinerary: [
    { day: 1, description: 'HCM - Đà Lạt: Đón khách tại sân bay, di chuyển đến Đà Lạt, nhận phòng khách sạn.' },
    { day: 2, description: 'Đà Lạt - Thác Phú Đài: Tham quan Thác Phú Đài, Đỉnh Bạc, ăn tối tại nhà hàng địa phương.' },
    { day: 3, description: 'Đà Lạt - Ngõ Nhật Nguyệt: Tham quan Ngõ Nhật Nguyệt, Đầm Cao Mỵ, tự do khám phá chợ đêm.' },
    { day: 4, description: 'Đà Lạt - HCM: Tham quan Rừng Dừa Bảy Mẫu, trở về HCM, kết thúc tour.' },
  ],
  schedule: [
    { date: 'TS 09/04/2025', price: '9.990.000 VNĐ', status: 'Lịch Hàng Tuần' },
    { date: 'CN 09/04/2025', price: '9.990.000 VNĐ', status: 'Lịch Hàng Tuần' },
    { date: 'TS 15/04/2025', price: '10.990.000 VNĐ', status: 'Lịch Hàng Tuần' },
    { date: 'CN 15/04/2025', price: '10.990.000 VNĐ', status: 'Lịch Hàng Tuần' },
    { date: 'TS 20/04/2025', price: '10.990.000 VNĐ', status: 'Lịch Hàng Tuần' },
    { date: 'CN 20/04/2025', price: '10.990.000 VNĐ', status: 'Lịch Hàng Tuần' },
  ],
  usefulInfo: [
    'Về Chỗ Nghỉ: Khách sạn 4 sao, đầy đủ tiện nghi.',
    'Về Thức Ăn: Bao gồm 3 bữa sáng, 4 bữa chính.',
    'Về Phương Tiện: Xe du lịch đời mới, máy lạnh.',
    'Lưu Ý: Mang theo giấy tờ tùy thân, quần áo phù hợp.',
  ],
};

// Sample related tours
const relatedTours = [
  {
    image: 'https://cdn2.ivivu.com/2023/04/11/15/ivivu-oishi-lavender-1-360x225.gif',
    title: 'Tour Đà Lạt 3N2Đ: HCM - Đà Lạt - Thác Datanla - Làng Cù Lần',
    description: '★ 3 Ngày 2 Đêm ★ Thác Datanla - Làng Cù Lần',
    price: '5.490.000 VNĐ',
    duration: '★ 3 Ngày 2 Đêm',
    transport: 'car',
  },
  {
    image: 'https://cdn2.ivivu.com/2023/04/11/15/ivivu-oishi-lavender-1-360x225.gif',
    title: 'Tour Miền Tây 3N2Đ: HCM - Cần Thơ - Cái Răng - Sóc Trăng',
    description: '★ 3 Ngày 2 Đêm ★ Chợ Nổi Cái Răng - Sóc Trăng',
    price: '4.990.000 VNĐ',
    duration: '★ 3 Ngày 2 Đêm',
    transport: 'car',
  },
  {
    image: 'https://cdn2.ivivu.com/2023/04/11/15/ivivu-oishi-lavender-1-360x225.gif',
    title: 'Tour Phú Quốc 4N3Đ: HCM - Phú Quốc - Hòn Thơm - Grand World',
    description: '★ 4 Ngày 3 Đêm ★ Hòn Thơm - Grand World',
    price: '7.890.000 VNĐ',
    duration: '★ 4 Ngày 3 Đêm',
    transport: 'plane',
  },
];

// Sample recently viewed tours
const recentlyViewedTours = [
  {
    image: 'https://via.placeholder.com/300x200?text=Recently+Viewed+1',
    title: 'Tour Nhật Bản 5N4Đ: HCM - Tokyo - Phú Sĩ - Yamanashi',
    price: '23.999.000 VNĐ',
  },
  {
    image: 'https://via.placeholder.com/300x200?text=Recently+Viewed+2',
    title: 'Tour Liên Tuyến 5N4Đ: HCM - Bangkok - Pattaya - Đảo San Hô',
    price: '6.800.000 VNĐ',
  },
];

const TourDetail = () => {
  const [activeTab, setActiveTab] = useState('khach-san'); // Default to 'khach-san'

  // Set activeTab based on URL hash when the component mounts
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['khach-san', 'tours', 've-vui-choi'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['khach-san', 'tours', 've-vui-choi'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container className="my-4 flex-grow-1" style={{ paddingTop: '70px' }}>
        {/* Tour Title */}
        <h1 className="mb-4">{tourData.title}</h1>

        {/* Main Image and Booking Form */}
        <Row className="mb-4">
          <Col md={8}>
            <div className="main-image mb-3">
              <img src={tourData.mainImage} alt="Main" className="img-fluid rounded" />
            </div>
            <div className="sub-images d-flex">
              {tourData.subImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Sub ${index}`}
                  className="sub-image me-2 rounded"
                />
              ))}
            </div>
          </Col>
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h4 className="text-danger">{tourData.price}</h4>
              <p className="text-muted">{tourData.duration}</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày khởi hành</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số lượng khách</Form.Label>
                  <Form.Control type="number" min="1" defaultValue="1" />
                </Form.Group>
                <Button variant="warning" className="w-100">
                  Đặt Tour
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Tour Information */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Thông tin tour</h4>
              <p><strong>Khởi hành:</strong> Hồ Chí Minh</p>
              <p><strong>Điểm đến:</strong> Đà Lạt</p>
              <p><strong>Thời gian:</strong> {tourData.duration}</p>
              <p><strong>Phương tiện:</strong> {tourData.transport === 'plane' ? 'Máy bay' : 'Xe'}</p>
              <p><strong>Mã tour:</strong> TOUR202847</p>
            </Card>
          </Col>
        </Row>

        {/* Highlights */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Trải nghiệm thú vị trong tour</h4>
              <ul>
                {tourData.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Program Details */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Chương trình tour</h4>
              {tourData.itinerary.map((day, index) => (
                <div key={index} className="mb-3">
                  <h5>Ngày {day.day}</h5>
                  <p>{day.description}</p>
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        {/* Schedule and Pricing */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Lịch khởi hành & Giá tour</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Ngày khởi hành</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {tourData.schedule.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.price}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="link">Xem thêm</Button>
            </Card>
          </Col>
        </Row>

        {/* Useful Information */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Thông tin cần lưu ý</h4>
              <ul>
                {tourData.usefulInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Related Tours */}
        <Row className="mb-4">
          <Col md={12}>
            <h3 className='mb-5'>Tours du lịch liên quan</h3>
            <Row className='mt-6'>
              {relatedTours.map((tour, index) => (
                <Col md={4} key={index} className="mb-4">
                  <TourCard tour={tour} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

      
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TourDetail;