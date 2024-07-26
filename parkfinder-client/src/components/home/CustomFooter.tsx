import { Container, Row, Col } from "react-bootstrap";
import "./CustomFooter.css";
import logo from "../../assets/NYC PARK FINDER LOGO.png";

function CustomFooter() {
  return (
    <footer className="footer py-3">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <img src={logo} alt="Logo" className="footer-logo" />
            <span className="ms-2">&copy; 2024 NYC Park Finder</span>
          </Col>{" "}
          <Col md={6} className="text-center text-md-end">
            <a href="#" className="text-dark me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-dark me-3">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-dark me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
export default CustomFooter;
