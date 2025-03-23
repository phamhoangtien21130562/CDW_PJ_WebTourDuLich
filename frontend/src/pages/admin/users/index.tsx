import React from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { PencilSquare, Trash, Plus } from "react-bootstrap-icons";

const Users = () => {
    // Dữ liệu mẫu
    const users = [
        { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", role: "Admin" },
        { id: 2, name: "Trần Thị B", email: "b@gmail.com", role: "User" },
        { id: 3, name: "Phạm Văn C", email: "c@gmail.com", role: "Editor" },
    ];

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
                    <h4 className="mb-0">Quản lý Người Dùng</h4>
                    <Button variant="light">
                        <Plus size={20} className="me-2" />
                        Thêm Người Dùng
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive>
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="text-center">
                                    <Button variant="warning" size="sm" className="me-2">
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

export default Users;
