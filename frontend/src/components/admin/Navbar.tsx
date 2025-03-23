import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

interface AdminNavbarProps {
    toggleSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ toggleSidebar }) => {
    return (
        <Navbar style={{ backgroundColor: "#0D6EFD" }} expand="lg">
            <Container fluid>
                {/* Nút mở/đóng sidebar */}
                <FaBars
                    size={22}
                    color="white"
                    className="me-3 cursor-pointer"
                    onClick={toggleSidebar}
                    style={{ cursor: "pointer" }}
                />
                {/* Logo */}
                <Navbar.Brand as={Link} to="/admin" style={{ color: "#ffffff", fontWeight: "bold" }}>
                    Admin Panel
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/admin/users" style={{ color: "#ffffff" }}>
                            Users
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/orders" style={{ color: "#ffffff" }}>
                            Orders
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/tours" style={{ color: "#ffffff" }}>
                            Tours
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
