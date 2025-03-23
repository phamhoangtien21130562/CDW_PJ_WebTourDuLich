import React from "react";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const Tours = () => {
    // Dữ liệu mẫu
    const tours = [
        {
            id: 201,
            name: "Hà Nội - Hạ Long 3N2Đ",
            price: 3200000,
            status: "Còn chỗ",
            startDate: "2025-04-10",
            endDate: "2025-04-13",
        },
        {
            id: 202,
            name: "Đà Nẵng - Hội An 4N3Đ",
            price: 4200000,
            status: "Hết chỗ",
            startDate: "2025-05-05",
            endDate: "2025-05-09",
        },
        {
            id: 203,
            name: "Nha Trang - Vinpearl 3N2Đ",
            price: 2800000,
            status: "Đã kết thúc",
            startDate: "2025-03-15",
            endDate: "2025-03-18",
        },
    ];

    // Hàm hiển thị badge trạng thái tour
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Còn chỗ":
                return <Badge bg="success">🟢 {status}</Badge>;
            case "Hết chỗ":
                return <Badge bg="warning">🟠 {status}</Badge>;
            case "Đã kết thúc":
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
                    <h4 className="mb-0">Danh sách Tours</h4>
                    <Button variant="light">+ Thêm Tour</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Tên Tour</th>
                            <th>Giá</th>
                            <th>Ngày khởi hành</th>
                            <th>Ngày kết thúc</th>
                            <th>Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tours.map((tour, index) => (
                            <tr key={tour.id}>
                                <td>{index + 1}</td>
                                <td>{tour.name}</td>
                                <td>{formatCurrency(tour.price)}</td>
                                <td>{tour.startDate}</td>
                                <td>{tour.endDate}</td>
                                <td>{getStatusBadge(tour.status)}</td>
                                <td className="text-center">
                                    <Button variant="info" size="sm" className="me-1">
                                        <PencilSquare size={16} /> Chỉnh sửa
                                    </Button>
                                    <Button variant="danger" size="sm">
                                        <Trash size={16} /> Xóa
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

export default Tours;
