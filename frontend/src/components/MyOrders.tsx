import React, { Component } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import '../assets/css/my-orders.css';

interface MyOrdersProps {}

interface MyOrdersState {
  activeTab: string;
}

class MyOrders extends Component<MyOrdersProps, MyOrdersState> {
  state: MyOrdersState = {
    activeTab: 'upcoming', // Tab mặc định là "Chuyến đi sắp tới"
  };

  handleTabChange = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <Container className="my-orders-container">
        <h3 className="text-center mb-4">Đơn hàng của tôi</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => this.handleTabChange(key || 'upcoming')}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="upcoming">Chuyến đi sắp tới</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="history">Lịch sử chuyến đi</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="upcoming">
              <div className="no-orders text-center">
                <img
                  src="https://member.ivivu.com/assets/img/user-dashboard/emptytrip.png"
                  alt="No orders"
                  className="no-orders-image"
                />
                <p className="mt-3">Hiện tại iVIVU chưa có đơn hàng nào!</p>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="history">
              <div className="no-orders text-center">
                <p>Chưa có lịch sử chuyến đi.</p>
                {/* Bạn có thể thêm nội dung lịch sử chuyến đi ở đây */}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    );
  }
}

export default MyOrders;