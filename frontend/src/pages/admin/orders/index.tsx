import React from "react";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { Eye, XCircle } from "react-bootstrap-icons";

const Orders = () => {
    // Dữ liệu mẫu
    const orders = [
        {
            id: 101,
            customer: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            amount: 2500000,
            status: "Đang xử lý",
            date: "2025-03-20",
        },
        {
            id: 102,
            customer: "Trần Thị B",
            email: "tranthib@example.com",
            amount: 4500000,
            status: "Hoàn thành",
            date: "2025-03-21",
        },
        {
            id: 103,
            customer: "Lê Công C",
            email: "lecongc@example.com",
            amount: 1500000,
            status: "Hủy",
            date: "2025-03-22",
        },
    ];

    // Hàm hiển thị badge trạng thái đơn hàng
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Đang xử lý":
                return <Badge bg="warning">🟠 {status}</Badge>;
            case "Hoàn thành":
                return <Badge bg="success">🟢 {status}</Badge>;
            case "Hủy":
                return <Badge bg="danger">🔴 {status}</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    // Hàm định dạng tiền VNĐ
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Danh sách Orders</h4>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Khách hàng</th>
                            <th>Email</th>
                            <th>Số tiền</th>
                            <th>Ngày đặt</th>
                            <th>Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.customer}</td>
                                <td>{order.email}</td>
                                <td>{formatCurrency(order.amount)}</td>
                                <td>{order.date}</td>
                                <td>{getStatusBadge(order.status)}</td>
                                <td className="text-center">
                                    <Button variant="info" size="sm" className="me-1">
                                        <Eye size={16} /> Xem
                                    </Button>
                                    {order.status !== "Hủy" && (
                                        <Button variant="danger" size="sm">
                                            <XCircle size={16} /> Hủy
                                        </Button>
                                    )}
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
