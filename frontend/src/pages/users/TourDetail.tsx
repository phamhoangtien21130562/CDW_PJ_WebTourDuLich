import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card,  Button, Form, Table } from 'react-bootstrap';

import '../../assets/css/tour.css';

import Footer from '../../components/Footer';

import Header from '../../components/HeaderUer';
import { Link } from 'react-router-dom';

interface ScheduleItem {
  dayNumber: number;
  description: string;
}

interface DepartureSchedule {
  departureDate: string;
  price: string;
  status: string;
}

interface TourDetailType {
  id: string;
  title: string;
  mainImageUrl: string;
  subImageUrls: string[];
  price: number;
  duration: string;
  transport: string;
  experiences: string[];
  schedule: ScheduleItem[];
  departureSchedules: DepartureSchedule[];
  notes: string[];
  availabilityStatus?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  // Thêm các trường khác nếu cần
}

const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Lấy id từ URL
  const [tour, setTour] = useState<TourDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    import('axios').then(({ default: axios }) => {
      axios.get<TourDetailType>(`http://localhost:8080/api/tours/${id}`)
        .then(res => setTour(res.data))
        .catch(err => console.error('Lỗi lấy chi tiết tour:', err))
        .finally(() => setLoading(false));
    });
  }, [id]);

  if (loading) return <div>Đang tải dữ liệu tour...</div>;
  if (!tour) return <div>Không tìm thấy tour.</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <Container className="my-4 flex-grow-1" style={{ paddingTop: '70px' }}>
    <div style={{ padding: '10px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
  <Link to="/" style={{ textDecoration: 'none', color: '#0d6efd', fontWeight: '500' }}>
    🏠 Trang chủ
  </Link>
</div>
        <h1 className="mb-4">{tour.title}</h1>

        {/* Ảnh chính và ảnh phụ */}
        <Row className="mb-4">
          <Col md={8}>
            <div className="main-image mb-3">
              <img
                src={`http://localhost:8080/loadImage?imageName=${encodeURIComponent(tour.mainImageUrl)}`}
                alt={tour.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="sub-images d-flex">
              {tour.subImageUrls?.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:8080/loadImage?imageName=${encodeURIComponent(imgUrl)}`}
                  alt={`Sub ${idx}`}
                  className="sub-image me-2 rounded"
                />
              ))}
            </div>
          </Col>

          {/* Form đặt tour */}
          <Col md={4}>
            <Card className="p-3 shadow-sm">
              <h4 className="text-danger">
                {tour.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </h4>
              <p className="text-muted">{tour.duration}</p>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Ngày khởi hành</Form.Label>
                  <Form.Control type="date" defaultValue={tour.startDate?.slice(0,10) || ''} />
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

        {/* Thông tin tour chung */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Thông tin tour</h4>
              <p><strong>Khởi hành:</strong> {tour.departure}</p>
              <p><strong>Điểm đến:</strong> {tour.destination}</p>
              <p><strong>Thời gian:</strong> {tour.duration}</p>
              <p><strong>Phương tiện:</strong> {tour.transport === 'plane' ? 'Máy bay' : 'Xe'}</p>
              <p><strong>Mã tour:</strong> {tour.tourCode}</p>
              <p><strong>Trạng thái:</strong> {tour.availabilityStatus || 'Chưa xác định'}</p>
            </Card>
          </Col>
        </Row>

        {/* Trải nghiệm */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Trải nghiệm thú vị trong tour</h4>
              <ul>
                {tour.experiences?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Chương trình tour */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Chương trình tour</h4>
              {tour.schedule?.map((item, index) => (
                <div key={index} className="mb-3">
                  <h5>Ngày {item.dayNumber}</h5>
                  <p>{item.description}</p>
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        {/* Lịch khởi hành & giá */}
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
                  {tour.departureSchedules?.map((item, index) => (
                    <tr key={index}>
                      <td>{new Date(item.departureDate).toLocaleDateString('vi-VN')}</td>
                      <td>{parseInt(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Bạn có thể thêm nút Xem thêm nếu cần */}
            </Card>
          </Col>
        </Row>

        {/* Thông tin lưu ý */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Thông tin cần lưu ý</h4>
              <ul>
                {tour.notes?.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>

        {/* Có thể thêm phần Tours liên quan nếu muốn */}

      </Container>

      <Footer />
    </div>
  );
};

export default TourDetail;
