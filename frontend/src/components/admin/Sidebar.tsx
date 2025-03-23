import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div style={{ width: "250px", height: "100vh", background: "#343a40", color: "white", padding: "20px" }}>
            <h4 className="text-center">Admin Panel</h4>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/admin" className="text-white">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/admin/users" className="text-white">Users</Nav.Link>
                <Nav.Link as={Link} to="/admin/orders" className="text-white">Orders</Nav.Link>
                <Nav.Link as={Link} to="/admin/tours" className="text-white">Tours</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
