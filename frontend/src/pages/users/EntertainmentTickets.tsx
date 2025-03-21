// EntertainmentTickets.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../assets/css/ticket.css';

import Footer from '../../components/Footer';
import TicketCard from '../../components/TicketCard';

// Sample data for entertainment tickets
const tickets = [
  {
    image: 'https://cdn1.ivivu.com/images/2023/09/12/18/jpg-2023-09-12T180006.132_cr_horizontal-356x220.webp',
    title: 'Vé Công Viên WinWonders Và Safari Phú Quốc',
    rating: '9.7',
    reviews: 19,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Đón tại sân bay, di chuyển đến công viên, vui chơi tự do.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '105.000 VNĐ',
  },
  {
    image: 'https://cdn1.ivivu.com/images/2023/09/12/18/jpg-2023-09-12T180006.132_cr_horizontal-356x220.webp',
    title: 'Vé Công Viên VinWonders Nha Trang',
    rating: '9.5',
    reviews: 14,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Vui chơi tự do tại công viên, QR code để vào cổng.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '354.000 VNĐ',
  },
  {
    image: 'https://cdn1.ivivu.com/images/2023/09/12/18/jpg-2023-09-12T180006.132_cr_horizontal-356x220.webp',
    title: 'Vé Công Viên Chơi Đùa Universal Studios Singapore',
    rating: '8.0',
    reviews: 12,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Trải nghiệm vui chơi tự do tại Universal Studios.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '305.000 VNĐ',
  },
  {
    image: 'https://cdn1.ivivu.com/images/2023/09/12/18/jpg-2023-09-12T180006.132_cr_horizontal-356x220.webp',
    title: 'Vé Thủy Cung S.E.A Aquarium Singapore',
    rating: '8.5',
    reviews: 15,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Tham quan thủy cung lớn nhất Singapore.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '305.000 VNĐ',
    badge: 'Được yêu thích',
  },
  {
    image: 'https://cdn1.ivivu.com/images/2023/09/12/18/jpg-2023-09-12T180006.132_cr_horizontal-356x220.webp',
    title: 'Vé Công Viên Giải Trí Sun World Bà Nà Hills',
    rating: '9.0',
    reviews: 20,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Trải nghiệm cáp treo, vui chơi tại Sun World.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '305.000 VNĐ',
  },
  {
    image: 'https://cdn1.ivivu.com/images/2023/09/12/18/jpg-2023-09-12T180006.132_cr_horizontal-356x220.webp',
    title: 'Vé Công Viên Nước Đầm Sen',
    rating: '8.8',
    reviews: 18,
    description: '★ Xác nhận đặt hàng trong 1 phút ★ Vui chơi tại công viên nước Đầm Sen.',
    bookingStats: '1 khách đặt trong 24 giờ qua',
    price: '305.000 VNĐ',
  },
];

const EntertainmentTickets: React.FC = () => {
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
     

      {/* Main Content */}
      <Container className="my-4 flex-grow-1" style={{ paddingTop: '70px' }}>
        <h3 className="mb-3">Công viên giải trí</h3>
        <h5 className="text-muted mb-5">Chơi thỏa thích - Vui phá cách</h5>
        <Row>
          {tickets.map((ticket, index) => (
            <Col md={4} key={index} className="mb-4">
              <TicketCard ticket={ticket} />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EntertainmentTickets;