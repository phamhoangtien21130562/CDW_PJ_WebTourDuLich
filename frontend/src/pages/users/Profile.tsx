import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, Form } from 'react-bootstrap';
import { FaBars, FaUser, FaShoppingCart, FaTicketAlt, FaComment } from 'react-icons/fa';
import '../../assets/css/Profile.css';
import MyOrders from '../../components/MyOrders';
import MyVouchers from '../../components/MyVouchers';
import MyComments from '../../components/MyComments';
import Header from '../../components/Header';

// Định nghĩa interface cho Province
interface Province {
    id: string | number;
    name: string;
  }
  
  // Định nghĩa các giá trị hợp lệ cho activeTab
  type Tab = 'tours' | 'khach-san' | 've-vui-choi';
const Profile: React.FC = () => {
    const [activeTab1, setActiveTab1] = useState<Tab>('tours');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Trạng thái ẩn/hiện thanh bên
  const [activeTab, setActiveTab] = useState('profile'); // Tab đang được chọn (mặc định là profile)
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa thông tin cá nhân

  // Hàm toggle thanh bên
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Hàm thay đổi tab
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsEditing(false); // Reset chế độ chỉnh sửa khi chuyển tab
  };

  // Hàm toggle chế độ chỉnh sửa
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  // Cập nhật activeTab dựa trên URL hash khi component mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Tab;
    if (hash && (['khach-san', 'tours', 've-vui-choi'] as Tab[]).includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  // Lắng nghe thay đổi hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Tab;
      if (hash && (['khach-san', 'tours', 've-vui-choi'] as Tab[]).includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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
              <ListGroup.Item
                action
                onClick={() => handleTabChange('vouchers')}
                active={activeTab === 'vouchers'}
              >
                <FaTicketAlt className="me-2" /> Voucher của tui
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => handleTabChange('comment')}
                active={activeTab === 'comment'}
              >
                <FaComment className="me-2" /> Bình luận của tôi
              </ListGroup.Item>
            </ListGroup>
          </Col>
        )}

        {/* Nội dung chính */}
        <Col md={isSidebarVisible ? 9 : 12} className="profile-content">
          {/* Tab Thông tin cá nhân */}
          {activeTab === 'profile' && (
            <Card>
              <Card.Body>
                <Card.Title>Thông tin cá nhân</Card.Title> 
                <Button variant="link" className="edit-link p-0" onClick={handleEditToggle}>
                          Chỉnh sửa
                        </Button>
                <Card.Text>Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</Card.Text>

                {isEditing ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ tên</Form.Label>
                      <Form.Control type="text" defaultValue="Duythuan Huynh" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Địa chỉ email</Form.Label>
                      <Form.Control type="email" defaultValue="huynduythuan686@gmail.com" />
                      <Form.Text className="text-muted">
                        Đây là email Quý khách đã xác thực. IVIVU sẽ gửi các xác nhận đến địa chỉ email này.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control type="text" placeholder="Thêm số điện thoại của bạn" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Ngày sinh</Form.Label>
                      <Form.Control type="date" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Giới tính</Form.Label>
                      <Form.Select>
                        <option>Chọn giới tính</option>
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control type="text" placeholder="Nhập địa chỉ" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Thông tin xuất hóa đơn trực tuyến</Form.Label>
                      <Form.Control type="text" placeholder="Nhập thông tin" />
                    </Form.Group>
                    <Button variant="primary" onClick={handleEditToggle}>
                      Lưu
                    </Button>
                  </Form>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Họ tên</label>
                      <p>
                        Duythuan Huynh{' '}
                      
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Địa chỉ email</label>
                      <p>
                        huynduythuan686@gmail.com{' '}
                      
                      </p>
                      <small>
                        Đây là email Quý khách đã xác thực. IVIVU sẽ gửi các xác nhận đến địa chỉ email này.
                      </small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Số điện thoại</label>
                      <p>
                        Thêm số điện thoại của bạn{' '}
                        
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Ngày sinh</label>
                      <p>
                        Nhập ngày sinh của bạn{' '}
                     
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Giới tính</label>
                      <p>
                        Nhập giới tính của bạn{' '}
                     
                      </p>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Địa chỉ</label>
                      <p>
                        Nhập địa chỉ{' '}
                     
                      </p>
                    </div>
                 
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
          {activeTab === 'vouchers' && (
           <MyVouchers/>
          )}
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