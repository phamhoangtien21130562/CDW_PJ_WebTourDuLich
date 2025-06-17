import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Form } from 'react-bootstrap';
import { FaBars, FaUser, FaShoppingCart, FaTicketAlt, FaComment } from 'react-icons/fa';
import '../../assets/css/Profile.css';
import MyOrders from '../../components/MyOrders';
import MyVouchers from '../../components/MyVouchers';
import MyComments from '../../components/MyComments';
import Header from '../../components/Header';
interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;  // ISO date string
  gender?: string;
  address?: string;
  invoiceInfo?: string;
}

  
  // Định nghĩa các giá trị hợp lệ cho activeTab
type Tab = 'tours' | 'khach-san' | 've-vui-choi' |'gioi-thieu' | 'blog';
const Profile: React.FC = () => {
    const [activeTab1, setActiveTab1] = useState<Tab>('tours');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Trạng thái ẩn/hiện thanh bên
  const [activeTab, setActiveTab] = useState('profile'); // Tab đang được chọn (mặc định là profile)
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa thông tin cá nhân
 const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
function parseJwt(token: string): { id?: string } | null {
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
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
useEffect(() => {
  // Get payment data from URL
  const urlParams = new URLSearchParams(window.location.search);
  const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
  const token = localStorage.getItem('token');

  console.log("Response: " + vnp_ResponseCode); // Example: "00"

  if (!token) {
    setError('Chưa đăng nhập');
    setIsLoading(false);
    return;
  }

  const decoded = parseJwt(token);
  if (!decoded || !decoded.id) {
    setError('Token không hợp lệ hoặc thiếu thông tin id');
    setIsLoading(false);
    return;
  }

  const userId = decoded.id;
  const orderIds = JSON.parse(sessionStorage.getItem('orderIds') || '[]');

  if (vnp_ResponseCode && userId && orderIds.length) {
    // Construct the URL for the payment response with the correct orderIds format
    const orderIdsParam = orderIds.join(',');  // Join orderIds as a comma-separated string

    // Construct the URL for the payment response
    const paymentResponseUrl = `http://localhost:8080/api/orders/paymentResponse?vnp_ResponseCode=${vnp_ResponseCode}&userId=${userId}&orderIds=${orderIdsParam}`;

    const handlePaymentResponse = async () => {
      try {
        const response = await fetch(paymentResponseUrl, {
          method: 'GET', // Use GET method as the parameters are passed via the URL
          headers: {
            'Content-Type': 'application/json', // Ensure Content-Type is set to application/json
          },
        });

        const contentType = response.headers.get('Content-Type');

        // Check if the response is JSON
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json(); // Only parse as JSON if the Content-Type is application/json
          console.log("Received JSON response:", data); // Process backend response here
        } else {
          // If the response is not JSON, handle it as a plain text response
          const textResponse = await response.text();
          console.log("Received non-JSON response:", textResponse); // Log the plain text response
        }
            // Remove orderIds from sessionStorage after successful response
        sessionStorage.removeItem('orderIds');
      } catch (err) {
        console.error('Error while handling payment response', err);
      }
    };

    handlePaymentResponse();
  }
}, []);



  // Hàm thay đổi tab
const handleTabChange = (tab: string) => {
  setActiveTab(tab);
  setIsEditing(false); // Reset chế độ chỉnh sửa khi chuyển tab
  window.location.hash = tab; // Update the URL hash
};
 useEffect(() => {
  // Thử lấy token từ sessionStorage hoặc localStorage
  const token =  localStorage.getItem('token');
  if (!token) {
    setError('Chưa đăng nhập');
    setIsLoading(false);
    return;
  }

  const decoded = parseJwt(token);
  if (!decoded || !decoded.id) {
    setError('Token không hợp lệ hoặc thiếu thông tin id');
    setIsLoading(false);
    return;
  }

  const userId = decoded.id;

  const fetchUser = async () => {
  try {
    const res = await fetch(`http://localhost:8080/users/${userId}`);
    if (!res.ok) {
      throw new Error('Không tìm thấy người dùng');
    }
    const data: User = await res.json();
    setUser(data);
    setFormData(data);
    setIsLoading(false);
  } catch (err) {
    // Specify the type as Error
    if (err instanceof Error) {
      setError(err.message || 'Lỗi khi lấy thông tin người dùng');
    } else {
      setError('Lỗi không xác định');
    }
    setIsLoading(false);
  }
};


  fetchUser();
}, []);
  // Hàm toggle chế độ chỉnh sửa
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
useEffect(() => {
  const hash = window.location.hash.replace('#', '') as Tab;
  if (hash && ['khach-san', 'tours', 've-vui-choi', 'gioi-thieu', 'blog'].includes(hash)) {
    setActiveTab(hash);
  }
}, []);


  // Lắng nghe thay đổi hash
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (hash && ['khach-san', 'tours', 've-vui-choi', 'gioi-thieu', 'blog'].includes(hash)) {
      setActiveTab(hash);
    }
  };
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
   const handleSave = async () => {
  if (!user) return;

  try {
    const res = await fetch(`http://localhost:8080/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
        gender: formData.gender,
        address: formData.address,
        invoiceInfo: formData.invoiceInfo,
      }),
    });

    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(errorMsg || 'Lưu thông tin thất bại');
    }

    const updatedUser = await res.json();
    setUser(updatedUser);
    setFormData(updatedUser);
    setIsEditing(false);
  } catch (error) {
    // Ensure error is typed as an instance of Error
    if (error instanceof Error) {
      alert(error.message);
    } else {
      // Fallback for unknown errors
      alert('Có lỗi xảy ra');
    }
  }
};


  return (
    <div>

<Header activeTab={activeTab1} setActiveTab={setActiveTab1} />
        <Container fluid className="mt-5">
      {/* Nút toggle thanh bên */}
      <Button variant="link" onClick={toggleSidebar} className="toggle-btn mb-3">
        <FaBars />
      </Button>

      <Row>
        {/* Thanh bên */}
        {isSidebarVisible && (
          <Col md={3} className="profile-sidebar">
            <h4>Hồ sơ của tui</h4>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                onClick={() => handleTabChange('profile')}
                active={activeTab === 'profile'}
              >
                <FaUser className="me-2" /> Thông tin cá nhân
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => handleTabChange('orders')}
                active={activeTab === 'orders'}
              >
                <FaShoppingCart className="me-2" /> Đơn hàng của tui
              </ListGroup.Item>
           
              
            </ListGroup>
          </Col>
        )}

        <Col md={isSidebarVisible ? 9 : 12} className="profile-content">
            {activeTab === 'profile' && (
              <Card>
                <Card.Body>
                  <Card.Title>Thông tin cá nhân</Card.Title>
                  <Button variant="link" className="edit-link p-0" onClick={handleEditToggle}>
                    {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                  </Button>
                  <Card.Text>Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</Card.Text>

                  {isLoading && <p>Đang tải thông tin...</p>}
                  {error && <p className="text-danger">{error}</p>}

                  {!isLoading && !error && user && (
                    <>
                      {isEditing ? (
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control
                              type="text"
                              name="fullName"
                              value={formData.fullName || ''}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email || ''}
                              readOnly
                            />
                            <Form.Text className="text-muted">
                              Đây là email Quý khách đã xác thực. IVIVU sẽ gửi các xác nhận đến địa chỉ email này.
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                              type="text"
                              name="phoneNumber"
                              value={formData.phoneNumber || ''}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                              type="date"
                              name="birthDate"
                              value={formData.birthDate ? new Date(formData.birthDate).toISOString().substr(0, 10) : ''}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select
                              name="gender"
                              value={formData.gender || ''}
                              onChange={handleInputChange}
                            >
                              <option value="">Chọn giới tính</option>
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                              <option value="Khác">Khác</option>
                            </Form.Select>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={formData.address || ''}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Thông tin xuất hóa đơn trực tuyến</Form.Label>
                            <Form.Control
                              type="text"
                              name="invoiceInfo"
                              value={formData.invoiceInfo || ''}
                              onChange={handleInputChange}
                            />
                          </Form.Group>

                          <Button variant="primary" onClick={handleSave}>
                            Lưu
                          </Button>
                        </Form>
                      ) : (
                        <>
                          <div className="mb-3">
                            <label className="form-label">Họ tên</label>
                            <p>{user.fullName}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Địa chỉ email</label>
                            <p>{user.email}</p>
                            <small>
                              Đây là email Quý khách đã xác thực. IVIVU sẽ gửi các xác nhận đến địa chỉ email này.
                            </small>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <p>{user.phoneNumber || 'Chưa cập nhật'}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Ngày sinh</label>
                            <p>{user.birthDate ? new Date(user.birthDate).toLocaleDateString() : 'Chưa cập nhật'}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Giới tính</label>
                            <p>{user.gender || 'Chưa cập nhật'}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <p>{user.address || 'Chưa cập nhật'}</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Thông tin xuất hóa đơn trực tuyến</label>
                            <p>{user.invoiceInfo || 'Chưa cập nhật'}</p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Card.Body>
              </Card>
            )}
          {/* Tab Đơn hàng */}
          {activeTab === 'orders' && (
           <MyOrders />
          )}

          {/* Tab Voucher */}
       
           {activeTab === 'comment' && (
           <MyComments/>
          )}
          
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Profile;