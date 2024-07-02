import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";

const NavBar: React.FC = () => {
  const [token, setToken] = useLocalStorage("token");
  const [userFirstName, setUserFirstName] = useLocalStorage("userFirstName");
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserFirstName(localStorage.getItem("userFirstName"));
  }, [setToken, setUserFirstName]);

  const isLoggedIn = !!token;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstName");
    setToken(null);
    setUserFirstName(null);
    navigate("/signin");
  };

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-2">
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
          zIndex: 10,
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
                {isLoggedIn ? (
                  <>
                    <NavDropdown.Header>
                      Welcome, {userFirstName}
                    </NavDropdown.Header>
                    <NavDropdown.Item onClick={handleSignOut}>
                      Sign Out
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <LinkContainer to="/signin">
                      <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
