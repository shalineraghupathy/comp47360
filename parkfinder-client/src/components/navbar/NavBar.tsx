import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <Navbar
      className="Navbar"
      expand="lg"
      fixed="top"
      sticky="top"
      style={{
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        borderBottom: "1px solid #ccc",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: "10",
      }}
    >
      <Container fluid>
        <Navbar.Brand href="#">ParkFinder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/parkmap">
              <Nav.Link>Park Search</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/amenities">
              <Nav.Link>Amenities</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={<FaUserCircle size={24} />}
              id="basic-nav-dropdown"
              align="end"
            >
              {!isLoggedIn ? (
                <>
                  <LinkContainer to="/signup">
                    <NavDropdown.Item>Sign In</NavDropdown.Item>
                  </LinkContainer>
                </>
              ) : (
                <NavDropdown.Item onClick={handleSignOut}>
                  Sign Out
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
