import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { LockFill, Trash, Unlock } from "react-bootstrap-icons";

// Định nghĩa kiểu User (bạn có thể bổ sung thêm trường nếu cần)
interface Role {
  id: string;
  name: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  roles: Role[];
  locked: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>("http://localhost:8080/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleBadge = (roles: Role[]) => {
    if (!roles || roles.length === 0)
      return <Badge bg="secondary">Không xác định</Badge>;

    const roleName = roles[0].name;

    switch (roleName) {
      case "ROLE_ADMIN":
        return <Badge bg="danger">🔴 Admin</Badge>;
      case "ROLE_USER":
        return <Badge bg="primary">🔵 User</Badge>;
      case "ROLE_STAFF":
        return <Badge bg="success">🟢 Staff</Badge>;
      default:
        return <Badge bg="secondary">{roleName}</Badge>;
    }
  };

  const getStatusBadge = (locked: boolean) => {
    return locked ? (
      <Badge bg="danger">🔴 Bị khóa</Badge>
    ) : (
      <Badge bg="success">🟢 Hoạt động</Badge>
    );
  };

  const toggleLock = async (user: User) => {
    try {
      const url = `http://localhost:8080/users/${user.id}/${
        user.locked ? "unlock" : "lock"
      }`;
      await axios.put(url);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái khóa:", error);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Danh sách Người dùng</h4>
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
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{getRoleBadge(user.roles)}</td>
                  <td>{getStatusBadge(user.locked)}</td>
                  <td className="text-center">
                    <Button
                      variant={user.locked ? "success" : "warning"}
                      size="sm"
                      className="me-1"
                      onClick={() => toggleLock(user)}
                      title={user.locked ? "Mở tài khoản" : "Khoá tài khoản"}
                    >
                      {user.locked ? <Unlock size={16} /> : <LockFill size={16} />}
                    </Button>
                  
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Users;
