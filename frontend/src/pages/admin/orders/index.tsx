import React from "react";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { Eye, CheckCircle, XCircle } from "react-bootstrap-icons";

const Orders = () => {
    // Dữ liệu mẫu
    const orders = [
        { id: 101, customer: "Nguyễn Văn A", total: "2,500,000đ", status: "Đã duyệt" },
        { id: 102, customer: "Trần Thị B", total: "1,200,000đ", status: "Chờ xử lý" },
        { id: 103, customer: "Phạm Văn C", total: "900,000đ", status: "Đã hủy" },
    ];

    // Hàm hiển thị trạng thái với màu sắc
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Đã duyệt":
                return <Badge bg="success"><CheckCircle size={16} className="me-1" /> {status}</Badge>;
            case "Chờ xử lý":
                return <Badge bg="warning"><Eye size={16} className="me-1" /> {status}</Badge>;
            case "Đã hủy":
                return <Badge bg="danger"><XCircle size={16} className="me-1" /> {status}</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Danh sách đơn hàng</h4>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Khách hàng</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.customer}</td>
                                <td>{order.total}</td>
                                <td>{getStatusBadge(order.status)}</td>
                                <td className="text-center">
                                    <Button variant="info" size="sm">
                                        <Eye size={16} className="me-1" /> Xem
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Orders;
