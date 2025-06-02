import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { Eye, XCircle, CheckCircle } from "react-bootstrap-icons";

// ✅ Định nghĩa kiểu Order
interface Order {
    _id?: string;
    id?: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    orderDate: string;
    status: "PENDING" | "COMPLETED" | "CANCELLED" | string;
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/orders");
            console.log("Kết quả đơn hàng từ server:", response.data);
            setOrders(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách đơn hàng:", error);
        }
    };

    const cancelOrder = async (id: string) => {
        console.log("Gửi yêu cầu huỷ với ID:", id);
        if (!window.confirm("Bạn có chắc muốn hủy đơn hàng này?")) return;
        try {
            await axios.put(`http://localhost:8080/api/orders/${id}/cancel`);
            fetchOrders();
        } catch (error) {
            console.error("Hủy đơn hàng thất bại:", error);
        }
    };

    const completeOrder = async (id: string) => {
        if (!window.confirm("Xác nhận đã hoàn tất đơn hàng này?")) return;
        try {
            await axios.put(`http://localhost:8080/api/orders/${id}/complete`);
            fetchOrders();
        } catch (error) {
            console.error("Xác nhận đơn hàng thất bại:", error);
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "PENDING":
                return <Badge bg="warning">🟠 Đang xử lý</Badge>;
            case "COMPLETED":
                return <Badge bg="success">🟢 Hoàn thành</Badge>;
            case "CANCELLED":
                return <Badge bg="danger">🔴 Hủy</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

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
                                <td>{order.customerName}</td>
                                <td>{order.customerEmail}</td>
                                <td>{formatCurrency(order.totalAmount)}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{getStatusBadge(order.status)}</td>
                                <td className="text-center">
                                    <Button variant="info" size="sm" className="me-1">
                                        <Eye size={16} /> Xem
                                    </Button>

                                    {order.status === "PENDING" && (
                                        <>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-1"
                                                onClick={() => completeOrder(order.id || order._id!)}
                                            >
                                                <CheckCircle size={16} /> Hoàn tất
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => cancelOrder(order.id || order._id!)}
                                            >
                                                <XCircle size={16} /> Hủy
                                            </Button>
                                        </>
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
