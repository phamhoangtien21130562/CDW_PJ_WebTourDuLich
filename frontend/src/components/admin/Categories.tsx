import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Table, Button, Container, Card, Modal, Form, Badge } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Category {
  id: string;
  name: string;
}

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>("http://localhost:8080/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
  try {
    const newCategory = { name: newCategoryName };
    const res = await axios.post("http://localhost:8080/api/categories", newCategory);
    
    // Nếu thêm danh mục thành công
    setCategories([...categories, res.data]);
    setShowModal(false);
    setNewCategoryName("");
    Swal.fire("Thành công!", "Danh mục đã được thêm.", "success");
  } catch (error: unknown) {
    // Xử lý lỗi từ axios
    if (error instanceof AxiosError) { // Kiểm tra nếu lỗi là từ Axios
      if (error.response && error.response.status === 400) {
        Swal.fire("Lỗi", error.response.data, "error"); // Hiển thị lỗi chi tiết từ backend
      } else {
        Swal.fire("Lỗi", "Không thể thêm danh mục lúc này.", "error");
      }
    } else {
      // Nếu không phải lỗi từ axios
      Swal.fire("Lỗi", "Đã có lỗi xảy ra, vui lòng thử lại.", "error");
    }
  }
};


  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xoá danh mục này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Có, xoá đi!",
      cancelButtonText: "Huỷ",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/categories/${id}`);
        Swal.fire("Đã xoá!", "Danh mục đã được xoá.", "success");
        // Load lại danh sách categories sau khi xoá
        setLoading(true);
        const res = await axios.get<Category[]>("http://localhost:8080/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Lỗi khi xoá danh mục:", error);
        Swal.fire("Lỗi", "Không thể xoá danh mục lúc này.", "error");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Danh sách Danh Mục</h4>
          <Button variant="light" onClick={() => setShowModal(true)}>
            + Thêm Danh Mục
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Tên Danh Mục</th>
                <th className="text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">
                    Không có danh mục nào.
                  </td>
                </tr>
              )}
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      className="me-1"
                      onClick={() => navigate(`/admin/categories/edit/${category.id}`)}
                    >
                      <PencilSquare size={16} /> Chỉnh sửa
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(category.id)}>
                      <Trash size={16} /> Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal Thêm Danh Mục */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Danh Mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="categoryName">
              <Form.Label>Tên Danh Mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên danh mục"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Categories;
