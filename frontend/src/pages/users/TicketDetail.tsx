// TicketDetail.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import '../../assets/css/ticket.css';

import Footer from '../../components/Footer';
import TicketCard from '../../components/TicketCard';
import Header from '../../components/HeaderUer';

// Sample ticket data
const ticketData = {
  title: 'Dịch vụ đưa tiễn tự Bangkok, Sân bay BKK hoặc DMK đến trung tâm Pattaya Thai Lan',
  mainImage: 'https://image.kkday.com/v2/image/get/w_1920,h_1080,c_fit,q_55,wm_auto/s1.kkday.com/product_151173/20230912054333_RhtIK/jpg',
  subImages: [
    'https://image.kkday.com/v2/image/get/w_1920,h_1080,c_fit,q_55,wm_auto/s1.kkday.com/product_151173/20230912054333_RhtIK/jpg',
    'https://image.kkday.com/v2/image/get/w_1920,h_1080,c_fit,q_55,wm_auto/s1.kkday.com/product_151173/20230912054333_RhtIK/jpg',
    'https://image.kkday.com/v2/image/get/w_1920,h_1080,c_fit,q_55,wm_auto/s1.kkday.com/product_151173/20230912054333_RhtIK/jpg',
  ],
  price: '995.000 VNĐ',
  benefits: [
    'Đón tại sân bay BKK hoặc DMK, di chuyển đến trung tâm Pattaya.',
    'Xe sạch sẽ, tài xế thân thiện, hỗ trợ nhiệt tình.',
    'Không cần lo lắng về phương tiện di chuyển sau khi hạ cánh.',
  ],
  usefulInfo: {
    beforeYouGo: [
      'Vui lòng cung cấp thông tin chuyến bay chính xác.',
      'Đến điểm đón trước giờ khởi hành ít nhất 15 phút.',
      'Mang theo giấy tờ tùy thân và vé điện tử.',
    ],
    howToUse: [
      'Gặp tài xế tại cổng sân bay BKK hoặc DMK.',
      'Xuất trình vé điện tử hoặc mã QR để xác nhận.',
      'Lên xe và di chuyển đến trung tâm Pattaya.',
    ],
    cancellation: [
      'Hủy miễn phí trước 24 giờ.',
      'Không hoàn tiền nếu hủy trong vòng 24 giờ trước giờ khởi hành.',
      'Liên hệ hotline để được hỗ trợ.',
    ],
  },
};

// Sample related tickets
const relatedTickets = [
  {
    image: 'https://image.kkday.com/v2/image/get/w_1920,h_1080,c_fit,q_55,wm_auto/s1.kkday.com/product_151173/20230912054333_RhtIK/jpg',
    title: 'Dịch vụ đưa tiễn từ sân bay BKK đến trung tâm Bangkok',
    rating: '9.0',
    reviews: 10,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Di chuyển nhanh chóng, tiện lợi.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '350.000 VNĐ',
  },
  {
    image: 'https://image.kkday.com/v2/image/get/w_1920,h_1080,c_fit,q_55,wm_auto/s1.kkday.com/product_151173/20230912054333_RhtIK/jpg',
    title: 'Chuyến phà từ Bangkok đến Pattaya (Lịch hàng ngày)',
    rating: '8.5',
    reviews: 8,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Trải nghiệm phà thoải mái.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '1.000.000 VNĐ',
  },
  {
    image: 'https://image.kkday.com/v2/image/get/w_1920,h_1080,c_fit,q_55,wm_auto/s1.kkday.com/product_151173/20230912054333_RhtIK/jpg',
    title: 'Chuyến phà từ Pattaya đến Koh Larn (Lịch hàng ngày)',
    rating: '9.2',
    reviews: 15,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Tham quan đảo Koh Larn.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '500.000 VNĐ',
  },
];

const TicketDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ve-vui-choi'); // Default to 've-vui-choi'

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
      <Header/>

      {/* Main Content */}
      <Container className="my-4 flex-grow-1" style={{ paddingTop: '70px' }}>
        {/* Ticket Title */}
        <h1 className="mb-4">{ticketData.title}</h1>

        {/* Main Image and Booking Form */}
        <Row className="mb-4">
          <Col md={8}>
            <div className="main-image mb-3">
              <img src={ticketData.mainImage} alt="Main" className="img-fluid rounded" />
            </div>
            <div className="sub-images d-flex">
              {ticketData.subImages.map((image, index) => (
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
              <h4 className="text-danger">{ticketData.price}</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày sử dụng</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Số lượng khách</Form.Label>
                  <Form.Control type="number" min="1" defaultValue="1" />
                </Form.Group>
                <Button variant="warning" className="w-100">
                  Chọn để đặt
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Benefits */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Lợi ích vé</h4>
              <ul>
                {ticketData.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Useful Information */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Thông tin cần biết</h4>
              <h5>Trước khi đi</h5>
              <ul>
                {ticketData.usefulInfo.beforeYouGo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
              <h5>Cách sử dụng vé</h5>
              <ul>
                {ticketData.usefulInfo.howToUse.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
              <h5>Chính sách hủy</h5>
              <ul>
                {ticketData.usefulInfo.cancellation.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Related Tickets */}
        <Row className="mb-4">
          <Col md={12}>
            <h3>Có thể bạn thích</h3>
            <Row>
              {relatedTickets.map((ticket, index) => (
                <Col md={4} key={index} className="mb-4">
                  <TicketCard ticket={ticket} />
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

export default TicketDetail;