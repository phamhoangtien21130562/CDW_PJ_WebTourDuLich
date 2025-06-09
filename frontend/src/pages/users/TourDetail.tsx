import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card,  Button, Form, Table } from 'react-bootstrap';

import '../../assets/css/tour.css';

import Footer from '../../components/Footer';
import { ToastContainer, toast } from 'react-toastify';  // Import React Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import CSS cho Toastify
import Header from '../../components/HeaderUer';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {  FaUserAlt } from 'react-icons/fa';

interface ScheduleItem {
  dayNumber: number;
  description: string;
}
interface User {
  fullName: string;
  email: string;
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
  departure?: string;  // Optional property, if it exists
  destination: string; // Add destination here
  tourCode: string;    // Add tourCode here
}

interface JwtPayload {
  fullName?: string;
  sub?: string;  // thường là username/email trong sub
  roles?: string[];
  id?: string;
}
interface Comment {
  id: string;
  comment: string;
  rating: number;
  user: User;
}
const TourDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [numGuests, setNumGuests] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>(''); // State to hold the comment

  const [comments, setComments] = useState<Comment[]>([]); // State to hold existing comments


  const token = localStorage.getItem('token');
  const isLoggedIn = token != null;

  useEffect(() => {
    if (id) {
      axios.get<TourDetailType>(`http://localhost:8080/api/tours/${id}`)
        .then(res => {
          setTour(res.data);
        })
        .catch(err => console.error('Error fetching tour:', err))
        .finally(() => setLoading(false));
    }

    // Get user ID from the token and update the state
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      const userIdFromToken = decoded?.id ?? null; // Ensure it falls back to null if no user ID is found
  

      console.log("User ID from Token:", userIdFromToken); // Log the userId here to confirm it's set correctly
    }

  }, [id]); // Ensure to run this effect only once or when `id` changes


  function parseJwt(token: string): JwtPayload | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }
  useEffect(() => {
  if (id) {
    // Fetch tour details
    axios.get<TourDetailType>(`http://localhost:8080/api/tours/${id}`)
      .then(res => {
        setTour(res.data);
      })
      .catch(err => console.error('Error fetching tour:', err))
      .finally(() => setLoading(false));

    // Fetch comments for the tour
    axios.get<Comment[]>(`http://localhost:8080/api/tours/${id}/comments`)
      .then(res => {
        setComments(res.data);  // Store comments in state
      })
      .catch(err => console.error('Error fetching comments:', err));
  }
}, [id]);  // Fetch when tourId changes
const handleBookTour = async () => {
  if (!isLoggedIn) {
    setError('Vui lòng đăng nhập để đặt tour!');
    toast.error('Vui lòng đăng nhập để đặt tour!');
    return;
  }

  const token = localStorage.getItem('token');
  const decoded = token ? parseJwt(token) : null;

  if (!decoded || !decoded.id) {
    setError('Lỗi xác thực người dùng!');
    toast.error('Lỗi xác thực người dùng!');
    return;
  }

  // Ensure numGuests has a valid value
  if (numGuests <= 0 || numGuests === null) {
    setError('Số lượng khách phải lớn hơn 0');
    toast.error('Số lượng khách phải lớn hơn 0');
    return;
  }

  // Safely access tour price, with fallback to 0 if undefined
  const totalPrice = (tour?.price ?? 0) * numGuests; // Use nullish coalescing to provide a default value

  if (totalPrice <= 0) {
    setError('Giá tour không hợp lệ!');
    toast.error('Giá tour không hợp lệ!');
    return;
  }

  console.log('Total Price:', totalPrice);  // Log the total price for debugging

  // Prepare cart data
  const cartData = {
    user: { id: decoded.id },
    tour: { id: tour?.id },
    numberOfGuests: numGuests,
    totalPrice,
  };

  console.log('Cart Data:', cartData);  

  try {
    // Make a POST request to the API for booking the tour
    const response = await axios.post('http://localhost:8080/api/carts', cartData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('Response from API:', response);  // Log API response for debugging
    toast.success('Đặt tour thành công!');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
    
      if (error.response) {
        console.error('Error from server:', error.response.data);
        toast.error(`Lỗi từ server: ${error.response.data.message || 'Có lỗi xảy ra khi đặt tour!'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        toast.error('Không nhận được phản hồi từ server. Vui lòng thử lại sau.');
      }
    } else {
      
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi đặt tour!');
    }
  }
};

const handleCommentSubmit = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    toast.error('Vui lòng đăng nhập để bình luận!');
    return;
  }

  const decoded = parseJwt(token);
  const userIdFromToken = decoded?.id ?? null;
  if (!userIdFromToken) {
    toast.error('Lỗi xác thực người dùng!');
    return;
  }

  if (!id || !comment.trim()) {
    toast.error('Vui lòng nhập đầy đủ bình luận và đánh giá!');
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:8080/api/tours/${id}/comments`,  // id refers to the tourId
      {
        comment: comment.trim(),
        userId: userIdFromToken,
        tourId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token as authorization header
        },
      }
    );


    setComment('');

    
    setComments([...comments, response.data]);

    toast.success('Bình luận thành công!');
  } catch (error: unknown) {
 
    if (axios.isAxiosError(error)) {
   
      if (error.response) {
        console.error('Error from server:', error.response.data);
        toast.error(`Lỗi từ server: ${error.response.data.message || 'Có lỗi xảy ra khi bình luận!'}`);
      } else if (error.request) {
       
        console.error('No response received:', error.request);
        toast.error('Không nhận được phản hồi từ server. Vui lòng thử lại sau.');
      }
    } else {
    
      console.error('Error:', error);
      toast.error('Có lỗi xảy ra khi bình luận!');
    }
  }
};

 
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
                  <Form.Label>Số lượng khách</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={numGuests}
                    onChange={(e) => setNumGuests(Number(e.target.value))}
                  />
                </Form.Group>
                 {error && <div className="alert alert-danger">{error}</div>}
                <Button variant="warning" className="w-100" onClick={handleBookTour}>
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
   <Row className="mb-4">
          <Col md={8}>
            <Card className="p-3 shadow-sm">
              <h4>Bình luận và đánh giá</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Bình luận</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
 
                </Form.Group>
                <Button variant="primary" onClick={handleCommentSubmit}>
                  Gửi Bình luận
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* Display Comments */}
   <Row className="mb-4">
  <Col md={8}>
    <Card className="p-3 shadow-sm">
      <h4>Danh sách bình luận</h4>
      <div style={{ maxHeight: '150px', overflowY: 'auto' }}> {/* Set a max height and enable scrolling */}
        {comments.length > 0 ? (
          <ul className="list-unstyled">
            {comments.map((comment) => (
              <li key={comment.id} className="d-flex align-items-center mb-3">
                {/* User Icon and Email */}
                <FaUserAlt className="me-2" size={20} /> {/* User icon */}
                <strong>{comment.user.fullName}</strong>
                <span className="ms-2 text-muted">({comment.user.email})</span>

                {/* Comment Text */}
                <p className="ms-3 mt-3">{comment.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có bình luận nào.</p>
        )}
      </div>
    </Card>
  </Col>
</Row>

      </Container>

      <Footer />
          <ToastContainer />
    </div>
  );
};

export default TourDetail;
