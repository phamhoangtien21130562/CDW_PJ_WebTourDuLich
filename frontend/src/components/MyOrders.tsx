import React, { Component } from 'react';
import { Container, Nav, Tab, Table, Button, Modal, Form } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa'; // Import delete icon from react-icons
import '../assets/css/my-orders.css';
import Swal from 'sweetalert2';

interface MyOrdersProps {}

interface MyOrdersState {
  activeTab: string;
  orders: Array<any>; // Replace with the actual type of the order data
  isLoading: boolean;
  error: string | null;
  showModal: boolean;
  selectedOrder: any; // To store the selected order for payment
}

class MyOrders extends Component<MyOrdersProps, MyOrdersState> {
  state: MyOrdersState = {
    activeTab: 'upcoming', // Default tab is "Giỏ hàng"
    orders: [], // Initially empty orders list
    isLoading: true,
    error: null,
    showModal: false, // Modal initially hidden
    selectedOrder: null, // Initially no selected order
  };

  componentDidMount() {
    this.fetchOrders();
  }

  parseJwt(token: string): { id?: string } | null {
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

  fetchOrders = async () => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      this.setState({ error: 'Chưa đăng nhập', isLoading: false });
      return;
    }

    const decoded = this.parseJwt(token);
    if (!decoded || !decoded.id) {
      this.setState({ error: 'Token không hợp lệ hoặc thiếu thông tin id', isLoading: false });
      return;
    }

    const userId = decoded.id;

    // Fetch orders for the user
    try {
      const res = await fetch(`http://localhost:8080/api/carts/orders/${userId}`);
      if (!res.ok) {
        throw new Error('Không tìm thấy đơn hàng');
      }
      const data = await res.json();
      this.setState({ orders: data, isLoading: false });
    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  };

  handleTabChange = (tab: string) => {
    this.setState({ activeTab: tab });
  };

handleShowModal = () => {
  // Tính tổng tiền cho tất cả các đơn hàng từ tourPrice
  const totalAmount = this.state.orders.reduce((total: number, order: any) => {
    // Nếu tourPrice không có giá trị, gán 0, ngược lại cộng tourPrice vào tổng
    return total + (order.tourPrice || 0); 
  }, 0);

  // Cập nhật state với tổng tiền cho tất cả các đơn hàng
  this.setState({
    showModal: true,
    selectedOrder: {
      totalAmount, // Thêm tổng tiền tính được vào selectedOrder
    },
  });
};
 getRandomNumber(len: number): string {
  let result = '';
  for (let i = 0; i < len; i++) {
    result += Math.floor(Math.random() * 10); // Random digit from 0 to 9
  }
  return result;
}
handlePayment = async () => {
  const token = localStorage.getItem('token');

  // Check if the user is logged in
  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Vui lòng đăng nhập để thực hiện thanh toán',
      confirmButtonText: 'OK',
    });
    return;
  }

  // If orders are not populated yet, fetch them
  if (this.state.orders.length === 0) {
    await this.fetchOrders();  // Fetch orders if they are empty
  }

 console.log("Orders before saving to sessionStorage:", this.state.orders);  // Add this log to debug
const orders = this.state.orders.map(order => ({
  ...order,
  tour: {
    id: order.tourId, // Ensure you pass the full Tour object
    // Other tour details if necessary (like title, price, etc.)
  },
  user: {
    id: order.userId,
    // Other user details if needed
  },
  customerName: order.customerName || order.userFullName || 'defaultName',
  customerEmail: order.customerEmail || order.userEmail || 'defaultEmail',
  totalAmount: order.tourPrice || 0,
}));


  // Log the updated orders to check that the fields are correctly populated
  console.log("Updated Orders before payment:", orders);

  // If no orders, show a warning
  if (orders.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Giỏ hàng của bạn đang trống',
      confirmButtonText: 'OK',
    });
    return;
  }

  // Calculate total payment amount based on the tourPrice from each order
  const paymentAmount = orders.reduce((total, order) => total + (order.tourPrice || 0), 0); 
  const currency = "VND"; // Specify the currency as "VND"

  // Validate the payment amount to be between 5,000 and under 1 billion
  if (paymentAmount < 5000 || paymentAmount >= 1000000000) {
    Swal.fire({
      icon: 'error',
      title: 'Số tiền giao dịch không hợp lệ',
      text: 'Số tiền hợp lệ từ 5,000 đến dưới 1 tỷ đồng',
      confirmButtonText: 'OK',
    });
    return;
  }

  const bankCode = 'VNPAY';  // Replace this with actual logic to collect the bank code
  const decoded = this.parseJwt(token);

  if (!decoded || !decoded.id) {
    this.setState({ error: 'Token không hợp lệ hoặc thiếu thông tin id', isLoading: false });
    return;
  }

  const userId = decoded.id;
  // Generate a random transaction ID
  const transactionId = this.getRandomNumber(8); 
  const paymentMethod = "Online Payment"; // Specify payment method as "Online Payment"

  try {
    // Send the payment request to the backend
    const res = await fetch('http://localhost:8080/api/orders/createWithPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token for authorization
      },
      body: JSON.stringify({
        orders,               // Send list of orders (including tour, user, and customer details)
        transactionId,        // Send the transaction ID
        paymentMethod,        // Send payment method
        paymentAmount,        // Send total payment amount (based on tourPrice)
        currency,             // Send currency (VND)
        bankCode,      
        userId       // Send userId
      }),
    });

    // Check if the response is not OK (Error case)
    if (!res.ok) {
      const errorText = await res.text();  // Get the error response if it's not JSON
      throw new Error(errorText || 'Thanh toán không thành công');
    }

    const data = await res.json(); // Parse the JSON response from the backend
    console.log('Dữ liệu trả về từ backend:', data);
 const orderIds = data.orders.map(order => order.id); // Now, you can safely map through the orders array

    // Store the list of order IDs into sessionStorage
    sessionStorage.setItem('orderIds', JSON.stringify(orderIds));

    console.log("Stored Order IDs:", orderIds);
    // Check if paymentUrls are present in the response
    const paymentUrls = data.paymentUrls || [];
    if (paymentUrls.length > 0) {
      // Redirect to the first payment URL
      const paymentUrl = paymentUrls[0];
      if (paymentUrl) {
        window.location.href = paymentUrl; // Redirect the user to the payment page
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Không có liên kết thanh toán',
          confirmButtonText: 'OK',
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Không có liên kết thanh toán',
        confirmButtonText: 'OK',
      });
    }

  

    // Clear the orders (optional, if you want to reset the cart)
    this.setState({
      orders: [], // Clear cart after successful payment
    });

  } catch (error) {
    // Handle errors during the payment process
    console.error('Lỗi thanh toán:', error);
    Swal.fire({
      icon: 'error',
      title: 'Có lỗi xảy ra khi thanh toán',
      text: error.message, // Show the error message
      confirmButtonText: 'OK',
    });
  }
};

  // Hide modal
  handleCloseModal = () => {
    this.setState({ showModal: false, selectedOrder: null });
  };

  handleDelete = async (cartId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng đăng nhập để xóa giỏ hàng',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Make DELETE request to remove the cart
    try {
      const res = await fetch(`http://localhost:8080/api/carts/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Không thể xóa đơn hàng');
      }

      // Remove the deleted order from the local state
      this.setState({
        orders: this.state.orders.filter(order => order.cartId !== cartId),
      });

      // Success alert
      Swal.fire({
        icon: 'success',
        title: 'Xóa đơn hàng thành công',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Lỗi khi xóa đơn hàng:', error);

      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Có lỗi xảy ra khi xóa đơn hàng',
        text: error.message,
        confirmButtonText: 'OK',
      });
    }
  };

  render() {
    const { activeTab, orders, isLoading, error, showModal, selectedOrder } = this.state;

    return (
      <Container className="my-orders-container">
        <h3 className="text-center mb-4">Đơn hàng của tôi</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => this.handleTabChange(key || 'upcoming')}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="upcoming">Giỏ hàng</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history">Lịch sử đơn hàng</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="upcoming">
              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className="text-center text-danger">{error}</div>
              ) : orders.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Tour</th>
                      <th>Giá tiền</th>
                      <th>Số lượng khách</th>
                      <th>Người dùng</th>
                      <th>Email</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.cartId}>
                        <td>{order.tourTitle}</td>
                        <td>{order.tourPrice ? order.tourPrice.toLocaleString() : 'Chưa xác định'}</td>
                        <td>{order.numberOfGuests || 'Chưa xác định'}</td>
                        <td>{order.userFullName}</td>
                        <td>{order.userEmail}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => this.handleDelete(order.cartId)}
                            size="sm"
                          >
                            <FaTrashAlt /> Xoá
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="no-orders text-center">
                  <img
                    src="https://member.ivivu.com/assets/img/user-dashboard/emptytrip.png"
                    alt="No orders"
                    className="no-orders-image"
                  />
                  <p className="mt-3">Hiện tại iVIVU chưa có đơn hàng nào!</p>
                </div>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <div className="no-orders text-center">
                <p>Chưa có lịch sử chuyến đi.</p>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Modal for Payment */}
      <Button
  variant="primary"
  onClick={() => this.handleShowModal()} // Call the function without passing just the first order
  size="sm"
>
  Thanh toán
</Button>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Thanh toán đơn hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder && (
              <Form>
                
                 <Form.Group>
        <Form.Label>Tổng tiền</Form.Label>
        <Form.Control
          type="text"
          value={selectedOrder.totalAmount ? selectedOrder.totalAmount.toLocaleString() : 'Chưa xác định'}
          readOnly
        />
      </Form.Group>
                {/* Add any additional payment details if needed */}
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Đóng
            </Button>
           <Button variant="primary" onClick={() => this.handlePayment()}>
  Thanh toán
</Button>

          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

export default MyOrders;
