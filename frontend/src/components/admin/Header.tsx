import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import { Link } from "react-router-dom";


const Header: React.FC = () => {
    return (
        <Navbar
            bg="dark"
            variant="dark"
            expand="lg"
            className="header sticky-top"
            style={{
                top: 0,
                zIndex: 1000,
                borderBottom: "1px solid #e0e0e0",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                padding: "0.5rem 1rem",
            }}
        >
            <Container>
                {/* Logo Admin */}
                <Navbar.Brand as={Link} to="/admin">
                    <img
                        src="https://www.ivivu.com/du-lich/content/img/logo.svg"
                        alt="Admin Logo"
                        height="30"
                    />{" "}
                    Admin Panel
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="admin-navbar" />
                <Navbar.Collapse id="admin-navbar">
                    {/* Menu điều hướng */}
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/admin/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/users">
                            Quản lý Users
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/tours">
                            Quản lý Tours
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/settings">
                            Cài đặt
                        </Nav.Link>
                    </Nav>

                    {/* Thanh tìm kiếm */}
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="Tìm kiếm..." className="me-2" />
                    </Form>

                    {/* Avatar Admin */}
                    <Nav>
                        <NavDropdown
                            title={<i className="bi bi-person-circle text-white"></i>} // Icon user
                            id="admin-dropdown"
                            align="end"
                        >
                            <NavDropdown.Item as={Link} to="/admin/profile">
                                Hồ sơ
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/admin/settings">
                                Cài đặt
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/logout" className="text-danger">
                                Đăng xuất
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
