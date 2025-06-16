import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



interface Tour {
  id: string;
  title: string;
  price: number;
  availabilityStatus: string | null;
  startDate: string | null;
  endDate: string | null;
}

const Tours: React.FC = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get<Tour[]>("http://localhost:8080/api/tours");
        setTours(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);
const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xoá tour này?",
      text: "Hành động này sẽ xoá mềm tour khỏi hệ thống!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có, xoá đi!",
      cancelButtonText: "Huỷ",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/tours/${id}`);
        Swal.fire("Đã xoá!", "Tour đã được xoá.", "success");
        // Load lại danh sách tours sau khi xoá
        setLoading(true);
        const res = await axios.get<Tour[]>("http://localhost:8080/api/tours");
        setTours(res.data);
      } catch (error) {
        console.error("Lỗi khi xoá tour:", error);
        Swal.fire("Lỗi", "Không thể xoá tour lúc này.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "Còn chỗ":
        return <Badge bg="success">🟢 {status}</Badge>;
      case "Hết chỗ":
        return <Badge bg="warning">🟠 {status}</Badge>;
      case "Đã kết thúc":
        return <Badge bg="danger">🔴 {status}</Badge>;
      default:
        return <Badge bg="secondary">Chưa xác định</Badge>;
    }
  };

  // Format tiền VNĐ
  const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Format ngày (có thể null)
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN");
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Danh sách Travel</h4>
          <Button variant="light" onClick={() => navigate("/addtour")}>
            + Thêm Tour
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Tên travel</th>
                <th>Giá</th>
                <th>Ngày KH</th>
                <th>Ngày KT</th>
                <th>Trạng thái</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tours.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center">
                    Không có tour nào.
                  </td>
                </tr>
              )}
              {tours.map((tour, index) => (
                <tr key={tour.id}>
                  <td>{index + 1}</td>
                  <td>{tour.title}</td>
                  <td>{formatCurrency(tour.price)}</td>
                  <td>{formatDate(tour.startDate)}</td>
                  <td>{formatDate(tour.endDate)}</td>
                  <td>{getStatusBadge(tour.availabilityStatus)}</td>
                  <td className="text-center">
                    <Button variant="info" size="sm" className="me-1" onClick={() => navigate(`/admin/tours/edit/${tour.id}`)}>
                      <PencilSquare size={16} /> Chỉnh sửa
                    </Button>
                  <Button
              variant="danger"
              size="sm"
              onClick={() => handleDelete(tour.id)}
            >
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
