import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// Định nghĩa type cho tab đang active
type Tab = "users" | "orders" | "tours";

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

function Header({ activeTab, setActiveTab }: HeaderProps) {
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
      <div className="App">
        <Navbar
            bg="primary"
            className="header sticky-top"
            variant="dark"
            expand="lg"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              backgroundColor: "#007bff",
              borderBottom: "1px solid #e0e0e0",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              padding: "0.5rem 1rem",
            }}
        >
          <Container>
            {/* Logo & Menu */}
            <Navbar.Brand href="#home" className="d-flex align-items-center">
              <img
                  src="https://www.ivivu.com/du-lich/content/img/logo.svg"
                  alt="IVIVU Logo"
                  style={{ marginRight: "20px" }}
              />
              <Nav className="d-flex">
                {/* Người dùng */}
                <Nav.Link
                    as={Link}
                    to="/admin/users"
                    className={`fw-semibold px-3 menu-link ${
                        activeTab === "users" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("users")}
                >
                  Người dùng
                </Nav.Link>

                {/* Đơn hàng */}
                <Nav.Link
                    as={Link}
                    to="/admin/orders"
                    className={`fw-semibold px-3 menu-link ${
                        activeTab === "orders" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("orders")}
                >
                  Đơn hàng
                </Nav.Link>

                {/* Tours */}
                <Nav.Link
                    as={Link}
                    to="/admin/tours"
                    className={`fw-semibold px-3 menu-link ${
                        activeTab === "tours" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tours")}
                >
                  Tours
                </Nav.Link>
              </Nav>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#contact" className="text-white">
                  <i className="bi bi-telephone-fill"></i> (028) 3933 8002
                </Nav.Link>
                <Nav.Link href="#location" className="text-white">
                  <i className="bi bi-geo-alt-fill"></i> Hồ Chí Minh
                </Nav.Link>

                {/* Icon user & dropdown */}
                <NavDropdown
                    title={<i className="bi bi-person-circle text-white"></i>}
                    id="user-dropdown"
                    align="end"
                    className="text-white"
                >
                  <NavDropdown.Item href="/register" className="text-center">
                    <span className="btn btn-info w-100">Đăng ký</span>
                  </NavDropdown.Item>
                  <NavDropdown.ItemText className="text-center">
                    Quý khách đã có tài khoản?
                  </NavDropdown.ItemText>
                  <NavDropdown.Item href="/login" className="text-center text-info">
                    Đăng nhập ngay
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* CSS nội bộ */}
        <style>
          {`
          .menu-link {
            font-size: 14px; /* Chữ nhỏ hơn */
            color: rgba(255, 255, 255, 0.75); /* Màu chữ mờ ban đầu */
            transition: color 0.3s ease-in-out;
          }

          .menu-link:hover {
            color: #ffffff; /* Sáng lên khi hover */
          }

          .menu-link.active {
            color: #ffffff !important; /* Giữ sáng khi nhấn */
            font-weight: bold;
          }
        `}
        </style>
      </div>
  );
}

export default Header;
