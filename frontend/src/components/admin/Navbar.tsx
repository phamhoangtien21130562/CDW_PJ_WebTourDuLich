import { Navbar, Container, Nav } from "react-bootstrap";

const AdminNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
                <Nav className="ms-auto">
                    <Nav.Link href="#">Tài khoản</Nav.Link>
                    <Nav.Link href="#">Đăng xuất</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
