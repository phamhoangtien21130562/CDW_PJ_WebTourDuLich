// components/Footer.js

import { Container, Row, Col } from 'react-bootstrap';
import { FaPhoneAlt } from 'react-icons/fa';
import "../App.css"
const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row>
          {/* Cột 1: Về IVIVU.com */}
          <Col md={2}>
            <h6>Về IVIVU.com</h6>
            <ul className="list-unstyled">
              <li>Về chúng tôi</li>
              <li>IVIVU Blog</li>
              <li>PMS - Miễn phí</li>
            </ul>
          </Col>

          {/* Cột 2: Thông tin cần biết */}
          <Col md={2}>
            <h6>Thông tin cần biết</h6>
            <ul className="list-unstyled">
              <li>Điều kiện & Điều khoản</li>
              <li>Quy chế hoạt động</li>
              <li>Câu hỏi thường gặp</li>
            </ul>
          </Col>

          {/* Cột 3: Đối tác */}
          <Col md={2}>
            <h6>Đối tác</h6>
            <ul className="list-unstyled">
              <li>Quy chế bảo hiểm Cathay</li>
              <li>Yêu cầu bồi thường Cathay</li>
              <li>Quy chế trả góp</li>
            </ul>
          </Col>

         
          {/* Cột 5: Được chứng nhận */}
          <Col md={2}>
            <h6>Được chứng nhận</h6>
            <div className="d-flex flex-wrap">
              <img
                src="https://cdn1.ivivu.com/bocongthuong.png"
                alt="Icon 1"
                className="me-2 mb-2"
                style={{ width: '100px', height: '50px' }}
              />
              <img
                src="https://res.ivivu.com/img/iata_logo.webp"
                alt="Icon 2"
                className="me-2 mb-2"
                style={{ width: '50px', height: '50px' }}
              />
            
            </div>
          </Col>

          {/* Cột 6: Liên hệ */}
          <Col md={4} className="text-md-end">
            <h6>Bạn cần trợ giúp? Hãy gọi ngay!</h6>
            <p>
              <FaPhoneAlt className="me-2" style={{ color: '#ff6200' }} />
              <span style={{ color: '#ff6200', fontSize: '1.2rem' }}>1900 1870</span>
            </p>
            <p className="text-muted">
              07h30 – 21h <br />
              Hồ Chí Minh
            </p>
          </Col>
        </Row>

        {/* Dòng bổ sung: Các giải thưởng */}
        <Row className="mt-3">
          <Col>
            <ul className="list-unstyled d-flex justify-content-between">
              <li>Đại lý Du lịch trực tuyến hàng đầu Việt Nam</li>
              <li>Nơi làm việc tốt nhất Châu Á</li>
              <li>Thương hiệu truyền cảm hứng APEA</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;