import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
// import AdminNavbar from "../components/admin/Navbar";
import Header from "../components/HeaderAdmin.tsx"
const AdminLayout = () => {
    return (
        <>
            {/*<AdminNavbar />*/}
            <Header />
            <Container fluid>
                <Row>
                    <Col xs={2} className="p-0">
                        <Sidebar />
                    </Col>

                    <Col xs={10} className="p-4">
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AdminLayout;
