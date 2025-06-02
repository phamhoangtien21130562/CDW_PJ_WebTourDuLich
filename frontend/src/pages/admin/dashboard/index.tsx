import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Badge } from "react-bootstrap";
import { Cart, People, Globe, CurrencyDollar } from "react-bootstrap-icons";
import { Line } from "react-chartjs-2";
import axios from "axios";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [statsData, setStatsData] = useState({
        totalUsers: 0,
        totalTours: 0,
        totalOrders: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/dashboard/stats")
            .then(res => {
                const data = res.data;
                setStatsData({
                    totalUsers: data.totalUsers,
                    totalTours: data.totalTours,
                    totalOrders: data.totalOrders,
                    totalRevenue: data.totalRevenue,
                });
            })
            .catch(err => {
                console.error("Lỗi lấy thống kê dashboard:", err);
            });
    }, []);

    // Dữ liệu thống kê tổng
    const stats = [
        { title: "Tổng Đơn hàng", value: statsData.totalOrders, icon: <Cart size={32} />, color: "primary" },
        { title: "Tổng Người dùng", value: statsData.totalUsers, icon: <People size={32} />, color: "success" },
        { title: "Tổng Tour", value: statsData.totalTours, icon: <Globe size={32} />, color: "warning" },
        { title: "Doanh thu", value: `$${Number(statsData.totalRevenue).toLocaleString()}`, icon: <CurrencyDollar size={32} />, color: "danger" },
    ];

    // Dữ liệu biểu đồ đơn hàng theo tháng (giả lập)
    const orderData = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
        datasets: [
            {
                label: "Số đơn hàng",
                data: [100, 150, 300, 250, 400, 600],
                borderColor: "#007bff",
                backgroundColor: "rgba(0, 123, 255, 0.5)",
            },
        ],
    };

    // Danh sách đơn hàng gần đây (giả lập)
    const recentOrders = [
        { id: "ORD001", customer: "Nguyễn Văn A", amount: "$500", status: "Đã xử lý" },
        { id: "ORD002", customer: "Trần Thị B", amount: "$350", status: "Chờ xử lý" },
        { id: "ORD003", customer: "Lê Văn C", amount: "$700", status: "Đã hủy" },
        { id: "ORD004", customer: "Phạm Văn D", amount: "$450", status: "Đã xử lý" },
    ];

    // Badge màu trạng thái đơn hàng
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Đã xử lý":
                return <Badge bg="success">✅ {status}</Badge>;
            case "Chờ xử lý":
                return <Badge bg="warning">⏳ {status}</Badge>;
            case "Đã hủy":
                return <Badge bg="danger">❌ {status}</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };
    const formatCurrency = (amount: number) =>
        amount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        });


    return (
        <Container className="mt-4">
            {/* Hàng thống kê */}
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

            {/* Biểu đồ & Đơn hàng gần đây */}
            <Row>
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">📈 Thống kê đơn hàng</Card.Header>
                        <Card.Body>
                            <Line data={orderData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
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
                                        <td>{order.customer}</td>
                                        <td>{order.amount}</td>
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
