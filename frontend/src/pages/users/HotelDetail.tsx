import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; 

import '../../assets/css/hotel.css';
import HotelCard from '../../components/HotelCard';

import Footer from '../../components/Footer';
import Header from '../../components/HeaderUer';

const hotelData = {
  name: 'Vinpearl Resort & Golf Nam Hội An',
  rating: 9.0,
  reviews: 248,
  location: 'Bình Minh, Quảng Nam',
  price: '2.652.000',
  mainImage: 'https://cdn1.ivivu.com/iVivu/2019/05/09/15/vinpearl-resort--13.webp?o=jpg',
  subImages: [
    'https://cdn1.ivivu.com/iVivu/2021/02/25/15/picture2-73x73.webp?o=jpg',
    'https://cdn1.ivivu.com/iVivu/2021/02/25/15/picture2-73x73.webp?o=jpg',
    'https://cdn1.ivivu.com/iVivu/2021/02/25/15/picture2-73x73.webp?o=jpg',
    'https://cdn1.ivivu.com/iVivu/2021/02/25/15/picture2-73x73.webp?o=jpg',
  ],
  package: 'VMB+VinWonders',
  packagePrice: '5.599 triệu/khách',
  description: 'Vinpearl Resort & Golf Nam Hội An là khu nghỉ dưỡng sang trọng tọa lạc tại bãi biển Bình Minh tuyệt đẹp, mang đến trải nghiệm nghỉ dưỡng đẳng cấp với sân golf tiêu chuẩn quốc tế, hồ bơi vô cực và các tiện ích giải trí đa dạng.',
  facilities: [
    'Hồ bơi vô cực',
    'Sân golf 18 lỗ',
    'Spa cao cấp',
    'Nhà hàng ẩm thực quốc tế',
    'Phòng gym hiện đại',
    'Khu vui chơi trẻ em',
  ],
  policies: {
    checkIn: '14:00',
    checkOut: '12:00',
    cancellation: 'Hủy miễn phí trước 7 ngày',
    payment: 'Thanh toán trước hoặc tại khách sạn',
  },
};

// Dữ liệu đánh giá mẫu (dựa trên ảnh)
const reviewsData = [
  {
    id: 1,
    name: 'Nguyễn Thị Quỳnh',
    rating: 10.0,
    date: '03-01-2025',
    comment: 'Mình thấy hài lòng về chuyến đi tại Vinpearl Resort & Golf Nam Hội An, chuyến đi mượt mà đều rất tốt.',
  },
  {
    id: 2,
    name: 'Phạm Minh Tu',
    rating: 10.0,
    date: '25-12-2024',
    comment: 'Chất lượng dịch vụ xuất sắc, đồ ăn ngon, nhân viên phục vụ tốt, chuyến đi xuôi đẹp.',
  },
  {
    id: 3,
    name: 'Trần Thị Minh Tuyết',
    rating: 10.0,
    date: '23-12-2024',
    comment: 'Chuyến đi ok, chất lượng dịch vụ mình rất hài lòng.',
  },
];

const similarHotels = [
  {
    id: 1,
    image: 'https://cdn1.ivivu.com/iVivu/2018/09/05/17/khach-san-flc-luxury-quy-nhon.webp?o=jpg',
    name: 'Khách sạn FLC Luxury Quy Nhơn',
    rating: 9.2,
    reviews: 946,
    description: 'Bể bơi thiết kế hoàn hảo cho trẻ em, rất an toàn, nhiều chỗ chơi khách như phòng chơi, khu cầu trượt,...',
    offer: '1 khách đặt trong 24h qua',
    package: '3N2D/VMB+Ăn sáng',
    price: '3.199.900',
  },
  {
    id: 2,
    image: 'https://cdn1.ivivu.com/iVivu/2018/09/05/17/khach-san-flc-luxury-quy-nhon.webp?o=jpg',
    name: 'Khu nghỉ dưỡng ANGSANA Lăng Cô Huế',
    rating: 9.8,
    reviews: 177,
    description: 'Nhẹ nhàng và thanh khiết như người con gái Huế, Angsana Lăng Cô dành cho bạn một kỳ nghỉ tuyệt vời bên bờ biển trải dài bất tận',
    offer: '1 khách đặt trong 24h qua',
    package: '3N2D/VMB+Dura Đón',
    price: '5.199.900',
  },
  {
    id: 3,
    image: 'https://cdn1.ivivu.com/iVivu/2018/09/05/17/khach-san-flc-luxury-quy-nhon.webp?o=jpg',
    name: 'Khách sạn InterContinental Grand Hồ Tràm',
    rating: 9.6,
    reviews: 2223,
    description: 'Combo tiện lợi - Không căng nghĩ ngợi - Thoải mái đi chơi!',
    offer: '1 khách đặt trong 24h qua',
    package: '3N1D+Xe+Ăn Sáng',
    price: '1.250.000',
  },
];

const HotelDetail = () => {
  const [mainImage, setMainImage] = useState(hotelData.mainImage);
  const [newComment, setNewComment] = useState(''); // State để lưu bình luận mới
  const [comments, setComments] = useState(reviewsData); // State để lưu danh sách bình luận

  const handleImageClick = (image: string) => { // Type inferred from onImageClick
    setMainImage(image);
  };
  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newReview = {
        id: comments.length + 1,
        name: 'Người dùng mới', // Có thể thay bằng tên người dùng thực tế nếu có hệ thống đăng nhập
        rating: 10.0, // Có thể thêm form để người dùng nhập rating
        date: new Date().toLocaleDateString('vi-VN'), // Ngày hiện tại
        comment: newComment,
      };
      setComments([...comments, newReview]);
      setNewComment(''); // Reset ô nhập sau khi gửi
    }
  };

  return (
<div>
<Header
       />
    <Container className="my-4">
        
      {/* Tiêu đề và thông tin chính */}
      <Row className="mb-4">
        <Col>
          <h1>
            {hotelData.name} <FaHeart className="text-danger" />
          </h1>
          <div className="d-flex align-items-center mb-2">
            <span className="text-warning">★★★★★</span>
            <Badge bg="success" className="ms-2">{hotelData.rating}</Badge>
            <span className="ms-2 text-muted">Tuyệt vời | {hotelData.reviews} đánh giá</span>
          </div>
          <p>{hotelData.location}</p>
        </Col>
        <Col className="text-end">
          <h3 className="text-danger">Giá chỉ từ {hotelData.price} VND</h3>
          <Button variant="warning">Đặt ngay</Button>
        </Col>
      </Row>

      {/* Bản đồ và hình ảnh */}
      <Row>
        <Col md={8}>
          <div className="main-image mb-3">
            <img src={mainImage} alt="Main" className="img-fluid rounded" />
            <div className="package-info">
              <Badge bg="danger">{hotelData.package} | {hotelData.packagePrice}</Badge>
            </div>
          </div>
          <div className="sub-images d-flex">
            {hotelData.subImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Sub ${index}`}
                className={`sub-image me-2 rounded ${mainImage === image ? 'active' : ''}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
        </Col>
      </Row>

      {/* Thông tin chi tiết khách sạn */}
      <Row className="mt-4">
        <h3>Thông tin chi tiết</h3>
        <Col md={12}>
          <Card className="p-3 shadow-sm">
            <h4>Giới thiệu</h4>
            <p>{hotelData.description}</p>

            <h4>Tiện ích</h4>
            <ul>
              {hotelData.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>

            <h4>Chính sách</h4>
            <ul>
              <li><strong>Nhận phòng:</strong> {hotelData.policies.checkIn}</li>
              <li><strong>Trả phòng:</strong> {hotelData.policies.checkOut}</li>
              <li><strong>Hủy phòng:</strong> {hotelData.policies.cancellation}</li>
              <li><strong>Thanh toán:</strong> {hotelData.policies.payment}</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* Khách sạn tương tự */}
      <Row className="mt-4">
        <h3>Khách sạn tương tự</h3>
        {similarHotels.map((hotel) => (
          <Col md={4} key={hotel.id} className="mb-4">
            <HotelCard hotel={hotel} />
          </Col>
        ))}
      </Row>

      {/* Phần đánh giá và bình luận */}
      <Row className="mt-4">
        <h3>Đánh giá từ khách hàng</h3>
        <Col md={12}>
          {comments.map((review) => (
            <Card key={review.id} className="p-3 mb-3 shadow-sm review-card">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{review.name}</h5>
                  <p className="text-muted">{review.date}</p>
                </div>
                <Badge bg="success">{review.rating.toFixed(1)} Tuyệt vời</Badge>
              </div>
              <p>{review.comment}</p>
            </Card>
          ))}
        </Col>
      </Row>

      {/* Ô nhập bình luận và nút gửi */}
      <Row className="mt-4">
        <Col md={12}>
          <h4>Để lại đánh giá của bạn</h4>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group controlId="commentForm">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Viết đánh giá của bạn về khách sạn..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="mb-3 shadow-sm"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Gửi bình luận
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Nút xem chi tiết */}
      <div className="text-center mt-4">
        <Button variant="warning">Chi tiết tại MMU.com</Button>
      </div>
    </Container>
    <Footer/>
</div>
  );
};

export default HotelDetail;