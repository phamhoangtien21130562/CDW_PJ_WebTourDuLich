import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { Cart, People, Globe, CurrencyDollar } from "react-bootstrap-icons";
import axios from "axios";
import dayjs from "dayjs";

interface Order {
    id: string;
    customerName: string;
    totalAmount: number;
    orderDate: string;
    status: string;
}

const Dashboard = () => {
    const [statsData, setStatsData] = useState({
        totalUsers: 0,
        totalTours: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });

    const [monthlyOrderStats, setMonthlyOrderStats] = useState({
        labels: [] as string[],
        data: [] as number[],
    });

    const [orders, setOrders] = useState<Order[]>([]);



    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
        .slice(0, 5);

    const stats = [
        { title: "Tổng Đơn hàng", value: statsData.totalOrders, icon: <Cart size={32} />, color: "primary" },
        { title: "Tổng Người dùng", value: statsData.totalUsers, icon: <People size={32} />, color: "success" },
        { title: "Tổng Tour", value: statsData.totalTours, icon: <Globe size={32} />, color: "warning" },
        { title: "Doanh thu", value: `${Number(statsData.totalRevenue).toLocaleString()}₫`, icon: <CurrencyDollar size={32} />, color: "danger" },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "COMPLETED":
                return <Badge bg="success">✅ Đã xử lý</Badge>;
            case "PENDING":
                return <Badge bg="warning">⏳ Chờ xử lý</Badge>;
            case "CANCELLED":
                return <Badge bg="danger">❌ Đã hủy</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Container className="mt-4">
            {/* Thống kê tổng */}
            <Row className="mb-4">
                {stats.map((stat, index) => (
                    <Col key={index} md={3}>
                        <Card className={`border-${stat.color} shadow-sm`}>
                            <Card.Body className="text-center">
                                <div className={`text-${stat.color} mb-2`}>{stat.icon}</div>
                                <h5>{stat.title}</h5>
                                <h3 className="fw-bold">{stat.value}</h3>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Bảng thống kê đơn hàng theo tháng */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">📊 Thống kê đơn hàng theo tháng</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>Tháng</th>
                                    <th>Số đơn hàng</th>
                                </tr>
                                </thead>
                                <tbody>
                                {monthlyOrderStats.labels.map((label, index) => (
                                    <tr key={index}>
                                        <td>{label}</td>
                                        <td>{monthlyOrderStats.data[index]}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Bảng đơn hàng gần đây */}
            <Row>
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-secondary text-white">📋 Đơn hàng gần đây</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover size="sm">
                                <thead>
                                <tr>
                                    <th>Mã ĐH</th>
                                    <th>Khách hàng</th>
                                    <th>Số tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recentOrders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.id}</td>
                                        <td>{order.customerName}</td>
                                        <td>{Number(order.totalAmount).toLocaleString()}₫</td>
                                        <td>{getStatusBadge(order.status)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
