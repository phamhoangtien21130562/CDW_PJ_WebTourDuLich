import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const IntroPage: React.FC = () => {
  return (
    <Container className="mt-5">
      {/* Tiêu đề */}
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Giới thiệu về IVIVU.com</h1>
        </Col>
      </Row>

      {/* Giới thiệu chung */}
      <Row>
        <Col>
          <Card className="p-4">
            <Card.Body>
              <Card.Text>
                Thành lập năm 2010, IVIVU.com là thành viên của Tập đoàn TMG Việt Nam với hơn 20 năm kinh nghiệm trong lĩnh vực Du lịch – Khách sạn. IVIVU.com tiên phong trong việc cung cấp các sản phẩm du lịch hiện đại đến khách hàng nội địa. Liên tục tăng trưởng mạnh qua những năm, IVIVU.com hiện là OTA hàng đầu Việt Nam trong phân khúc cao cấp với thế mạnh khoảng 2.500 khách sạn tại Việt Nam và hơn 30.000 khách sạn quốc tế.
              </Card.Text>
              <Card.Text>
                Với mục tiêu mang đến cho khách hàng "Trải nghiệm kỳ nghỉ tuyệt vời", IVIVU.com kỳ vọng trở thành nền tảng du lịch nghỉ dưỡng số 1 cho khách hàng Đông Nam Á trong 5 năm tới.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Mục tiêu */}
      <Row className="my-4">
        <Col>
          <Card className="p-4">
            <Card.Body>
              <Card.Title>Mục tiêu của IVIVU</Card.Title>
              <Card.Text>
                Đem sản phẩm chính của IVIVU là Combo du lịch – sản phẩm cung cấp đầy đủ cho mọi kỳ nghỉ bao gồm phòng khách sạn, vé máy bay, tour du lịch, chuyển nhượng, visa, và nhiều dịch vụ khác.
              </Card.Text>
              <Card.Text>
                IVIVU.com luôn hướng đến chất lượng cao, dịch vụ chuyên nghiệp và chăm sóc khách hàng chu đáo, tạo nên những trải nghiệm tuyệt vời nhất cho khách hàng.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Liên hệ */}
      <Row className="mb-4">
        <Col>
          <h4 className="text-center">Liên hệ với chúng tôi</h4>
          <Card className="p-4">
            <Card.Body>
              <Card.Text>
                1. Đặt dịch vụ hàng hóa, liên hệ: Hotline 1900 1870 – Email: <strong>Tc@IVIVU.com</strong>
              </Card.Text>
              <Card.Text>
                2. Nhà cung cấp liên hệ: Email: <strong>Market@ivivu.com</strong>
              </Card.Text>
              <Card.Text>
                3. Liên hệ Marketing: Email: <strong>marketing@ivivu.com</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Button Call to Action */}
    
    </Container>
  );
};

export default IntroPage;
