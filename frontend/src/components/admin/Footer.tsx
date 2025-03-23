import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../App.css";

const Footer = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-light">
            <Container>
                <Row className="align-items-center">
                    {/* Bản quyền */}
                    <Col md={6} className="text-center text-md-start">
                        <p className="mb-0">&copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
                    </Col>

                    {/* Liên hệ hỗ trợ */}
                    <Col md={6} className="text-center text-md-end">
                        <p className="mb-0">Hỗ trợ: <a href="mailto:support@ivivu.com" className="text-light">support@ivivu.com</a></p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
