import React, { Component } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import '../assets/css/my-vouchers.css';

interface MyVouchersProps {}

interface MyVouchersState {
  activeTab: string;
}

class MyVouchers extends Component<MyVouchersProps, MyVouchersState> {
  state: MyVouchersState = {
    activeTab: 'available', // Tab mặc định là "Voucher của bạn"
  };

  handleTabChange = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;

    return (
      <Container className="my-vouchers-container">
        <h3 className="text-center mb-4">Voucher</h3>
        <Tab.Container activeKey={activeTab} onSelect={(key) => this.handleTabChange(key || 'available')}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="available">Voucher của bạn</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="used">Voucher đã sử dụng</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="available">
              <div className="no-vouchers text-center">
                <p>Chưa có voucher nào.</p>
                {/* Bạn có thể thêm danh sách voucher ở đây */}
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="used">
              <div className="no-vouchers text-center">
                <p>Chưa có voucher đã sử dụng.</p>
                {/* Bạn có thể thêm danh sách voucher đã sử dụng ở đây */}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    );
  }
}

export default MyVouchers;