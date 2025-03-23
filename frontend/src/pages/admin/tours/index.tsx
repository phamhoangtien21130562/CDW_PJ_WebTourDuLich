import React from "react";
import { Table, Button, Container, Card, Badge, Image } from "react-bootstrap";
import { Eye, PencilSquare, Trash } from "react-bootstrap-icons";

const Tours = () => {
    // Dữ liệu mẫu
    const tours = [
        {
            id: 1,
            name: "Hà Nội - Sapa 3 ngày 2 đêm",
            price: "3,500,000đ",
            status: "Đang mở bán",
            image: "https://picsum.photos/60/40?random=1",
        },
        {
            id: 2,
            name: "Đà Nẵng - Hội An 4 ngày 3 đêm",
            price: "5,200,000đ",
            status: "Sắp mở bán",
            image: "https://picsum.photos/60/40?random=2",
        },
        {
            id: 3,
            name: "Phú Quốc - Thiên đường biển",
            price: "6,800,000đ",
            status: "Hết chỗ",
            image: "https://picsum.photos/60/40?random=3",
        },
    ];

    // Hàm hiển thị trạng thái với màu sắc
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Đang mở bán":
                return <Badge bg="success">🟢 {status}</Badge>;
            case "Sắp mở bán":
                return <Badge bg="warning">🟡 {status}</Badge>;
            case "Hết chỗ":
                return <Badge bg="danger">🔴 {status}</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Danh sách Tour</h4>
                    <Button variant="light">➕ Thêm Tour</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Hình ảnh</th>
                            <th>Tên Tour</th>
                            <th>Giá</th>
                            <th>Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tours.map((tour, index) => (
                            <tr key={tour.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Image src={tour.image} rounded width={60} height={40} />
                                </td>
                                <td>{tour.name}</td>
                                <td>
                                    <strong className="text-success">{tour.price}</strong>
                                </td>
                                <td>{getStatusBadge(tour.status)}</td>
                                <td className="text-center">
                                    <Button variant="info" size="sm" className="me-1">
                                        <Eye size={16} /> Xem
                                    </Button>
                                    <Button variant="warning" size="sm" className="me-1">
                                        <PencilSquare size={16} /> Sửa
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
