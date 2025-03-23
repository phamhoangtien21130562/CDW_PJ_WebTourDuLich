import React from "react";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const Users = () => {
    // Dữ liệu mẫu
    const users = [
        {
            id: 101,
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            role: "Admin",
            status: "Hoạt động",
        },
        {
            id: 102,
            name: "Trần Thị B",
            email: "tranthib@example.com",
            role: "User",
            status: "Bị khóa",
        },
        {
            id: 103,
            name: "Lê Văn C",
            email: "levanc@example.com",
            role: "Staff",
            status: "Hoạt động",
        },
    ];

    // Hàm hiển thị badge vai trò
    const getRoleBadge = (role: string) => {
        switch (role) {
            case "Admin":
                return <Badge bg="danger">🔴 {role}</Badge>;
            case "User":
                return <Badge bg="primary">🔵 {role}</Badge>;
            case "Staff":
                return <Badge bg="success">🟢 {role}</Badge>;
            default:
                return <Badge bg="secondary">{role}</Badge>;
        }
    };

    // Hàm hiển thị trạng thái tài khoản
    const getStatusBadge = (status: string) => {
        return status === "Hoạt động" ? (
            <Badge bg="success">🟢 {status}</Badge>
        ) : (
            <Badge bg="danger">🔴 {status}</Badge>
        );
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Danh sách Người dùng</h4>
                    <Button variant="light">+ Thêm Người dùng</Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Họ & Tên</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Trạng thái</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>{getStatusBadge(user.status)}</td>
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

export default Users;
