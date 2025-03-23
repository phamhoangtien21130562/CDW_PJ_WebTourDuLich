import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { House, Envelope, PencilSquare, Calendar, Chat, BarChart, FileEarmarkText, Palette, Table, Map } from "react-bootstrap-icons";

const Sidebar = () => {
    return (
        <div style={{ width: "250px", height: "100vh", background: "#ffffff", padding: "20px", borderRight: "1px solid #dee2e6" }}>

            <Nav className="flex-column">
                <Nav.Link as={Link} to="/admin" className="text-secondary d-flex align-items-center">
                    <House className="me-2 text-primary" /> Bảng điều khiển
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/email" className="text-secondary d-flex align-items-center">
                    <Envelope className="me-2 text-brown" /> E-mail
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/editor" className="text-secondary d-flex align-items-center">
                    <PencilSquare className="me-2 text-blue" /> Soạn thảo
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/calendar" className="text-secondary d-flex align-items-center">
                    <Calendar className="me-2 text-danger" /> Lịch
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/chat" className="text-secondary d-flex align-items-center">
                    <Chat className="me-2 text-purple" /> Trò chuyện
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/charts" className="text-secondary d-flex align-items-center">
                    <BarChart className="me-2 text-indigo" /> Biểu đồ
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/forms" className="text-secondary d-flex align-items-center">
                    <FileEarmarkText className="me-2 text-blue" /> Biểu mẫu
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/ui" className="text-secondary d-flex align-items-center">
                    <Palette className="me-2 text-pink" /> Các thành phần UI
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/tables" className="text-secondary d-flex align-items-center">
                    <Table className="me-2 text-dark" /> Bảng
                </Nav.Link>
                <Nav.Link as={Link} to="/admin/maps" className="text-secondary d-flex align-items-center">
                    <Map className="me-2 text-dark" /> Bản đồ
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
