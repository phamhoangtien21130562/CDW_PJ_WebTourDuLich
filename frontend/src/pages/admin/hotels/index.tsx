// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Button, Container, Card, Badge } from "react-bootstrap";
// import { PencilSquare, Trash } from "react-bootstrap-icons";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
//
// interface Hotel {
//     id: string;
//     name: string;
//     location: string;
//     pricePerNight: number;
//     status: string | null; // e.g. "Còn phòng", "Hết phòng"
// }
//
// const Hotels: React.FC = () => {
//     const navigate = useNavigate();
//     const [hotels, setHotels] = useState<Hotel[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//
//     useEffect(() => {
//         const fetchHotels = async () => {
//             try {
//                 const res = await axios.get<Hotel[]>("http://localhost:8080/api/hotels");
//                 setHotels(res.data);
//             } catch (error) {
//                 console.error("Lỗi khi lấy danh sách hotels:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchHotels();
//     }, []);
//
//     const handleDelete = async (id: string) => {
//         const result = await Swal.fire({
//             title: "Bạn có chắc muốn xoá khách sạn này?",
//             text: "Hành động này sẽ xoá mềm khách sạn khỏi hệ thống!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#d33",
//             cancelButtonColor: "#3085d6",
//             confirmButtonText: "Có, xoá đi!",
//             cancelButtonText: "Huỷ",
//         });
//
//         if (result.isConfirmed) {
//             try {
//                 await axios.delete(`http://localhost:8080/api/hotels/${id}`);
//                 Swal.fire("Đã xoá!", "Khách sạn đã được xoá.", "success");
//                 setLoading(true);
//                 const res = await axios.get<Hotel[]>("http://localhost:8080/api/hotels");
//                 setHotels(res.data);
//             } catch (error) {
//                 console.error("Lỗi khi xoá khách sạn:", error);
//                 Swal.fire("Lỗi", "Không thể xoá khách sạn lúc này.", "error");
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };
//
//     const getStatusBadge = (status: string | null) => {
//         switch (status) {
//             case "Còn phòng":
//                 return <Badge bg="success">🟢 {status}</Badge>;
//             case "Hết phòng":
//                 return <Badge bg="danger">🔴 {status}</Badge>;
//             default:
//                 return <Badge bg="secondary">Không xác định</Badge>;
//         }
//     };
//
//     const formatCurrency = (amount: number) =>
//         amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
//
//     if (loading) return <div>Đang tải dữ liệu...</div>;
//
//     return (
//         <Container className="mt-4">
//             <Card className="shadow-sm">
//                 <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
//                     <h4 className="mb-0">Danh sách Khách sạn</h4>
//                     <Button variant="light" onClick={() => navigate("/addhotel")}>
//                         + Thêm khách sạn
//                     </Button>
//                 </Card.Header>
//                 <Card.Body>
//                     <Table striped bordered hover responsive>
//                         <thead className="table-dark">
//                         <tr>
//                             <th>#</th>
//                             <th>Tên khách sạn</th>
//                             <th>Vị trí</th>
//                             <th>Giá / đêm</th>
//                             <th>Trạng thái</th>
//                             <th className="text-center">Hành động</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {hotels.length === 0 ? (
//                             <tr>
//                                 <td colSpan={6} className="text-center">
//                                     Không có khách sạn nào.
//                                 </td>
//                             </tr>
//                         ) : (
//                             hotels.map((hotel, index) => (
//                                 <tr key={hotel.id}>
//                                     <td>{index + 1}</td>
//                                     <td>{hotel.name}</td>
//                                     <td>{hotel.location}</td>
//                                     <td>{formatCurrency(hotel.pricePerNight)}</td>
//                                     <td>{getStatusBadge(hotel.status)}</td>
//                                     <td className="text-center">
//                                         <Button
//                                             variant="info"
//                                             size="sm"
//                                             className="me-1"
//                                             onClick={() => navigate(`/admin/hotels/edit/${hotel.id}`)}
//                                         >
//                                             <PencilSquare size={16} /> Chỉnh sửa
//                                         </Button>
//                                         <Button
//                                             variant="danger"
//                                             size="sm"
//                                             onClick={() => handleDelete(hotel.id)}
//                                         >
//                                             <Trash size={16} /> Xóa
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                         </tbody>
//                     </Table>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };
//
// export default Hotels;
