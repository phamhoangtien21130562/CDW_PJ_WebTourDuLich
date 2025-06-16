import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../assets/css/tour.css';
import TourCard from './TourCard';

interface Tour {
  id: string;
  title: string;
  price: number;
  mainImageUrl: string;
  schedule?: { dayNumber: number; description: string }[];
  availabilityStatus?: string | null;
  badge?: string;
  icons?: string[];
}

const Tour: React.FC = () => {
  const [holidayTours, setHolidayTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('axios').then(({ default: axios }) => {
      axios.get<Tour[]>('http://localhost:8080/api/tours/category/68404fb5a0e03226d2f0ceed')
        .then(res => {

          setHolidayTours(res.data);
        })
        .catch(err => {
          console.error('Lỗi lấy dữ liệu holidayTours:', err);
        })
        .finally(() => setLoading(false));
    });
  }, []);

  if (loading) return <div>Đang tải dữ liệu tour...</div>;

  return (
    <div className="App">
     
      <Container className="mt-5">
        <h3 className="mb-5">Tour Du Lịch Lễ</h3>
        <h5 className="text-muted">Chốt Lịch Đi, Khởi Hành Lễ Về Lễ</h5>

        {holidayTours.length === 0 ? (
          <p>Không có tour nào phù hợp.</p>
        ) : (
          <Row>
            {holidayTours.map(tour => (
              <Col md={4} key={tour.id} className="mb-4">
                <TourCard
                  tour={{
                     id: tour.id, 
                    image: tour.mainImageUrl
                      ? `http://localhost:8080/loadImage?imageName=${encodeURIComponent(tour.mainImageUrl)}`
                      : 'https://via.placeholder.com/300x200',
                    title: tour.title,
                    price: tour.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                    description: tour.schedule?.[0]?.description || 'Không có mô tả',
                    badge: tour.availabilityStatus || '', // Vì backend null thì để chuỗi rỗng
                    icons: ['star-fill', 'heart-fill'], // Bạn có thể tuỳ chỉnh
                  }}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Tour;
