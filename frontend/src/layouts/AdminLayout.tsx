import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/admin">Admin Panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/admin/users">Users</Nav.Link>
                            <Nav.Link as={Link} to="/admin/orders">Orders</Nav.Link>
                            <Nav.Link as={Link} to="/admin/tours">Tours</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Sidebar + Nội dung */}
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Col xs={2} className="p-0">
                        <Sidebar />
                    </Col>

                    {/* Nội dung chính */}
                    <Col xs={10} className="p-4">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminLayout;
