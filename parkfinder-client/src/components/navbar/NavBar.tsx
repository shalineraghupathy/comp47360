/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import useLocalStorage from "../../hooks/useLocalStorage";
import ProfileCard from "./ProfileCard";

const NavBar: React.FC = () => {
  const [token, setToken] = useLocalStorage("token");
  const [userFirstName, setUserFirstName] = useLocalStorage("userFirstName");
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);

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
        <LinkContainer to="/">
          <Navbar.Brand href="#">NYC ParkFinder</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/parkmap">
              <Nav.Link>Park Map</Nav.Link>
            </LinkContainer>
            <ScrollLink
              to="natParks"
              smooth={true}
              duration={200}
              offset={-70}
              style={{ cursor: "pointer" }}
            >
              <Nav.Link as="span">National Parks</Nav.Link>
            </ScrollLink>
            <LinkContainer to="/eventcalendar">
              <Nav.Link>Event Calendar</Nav.Link>
            </LinkContainer>
            <ScrollLink
              to="aboutSection"
              smooth={true}
              duration={200}
              offset={-70}
              style={{ cursor: "pointer" }}
            >
              <Nav.Link as="span">About</Nav.Link>
            </ScrollLink>
            <NavDropdown
              title={<FaUserCircle size={24} />}
              id="basic-nav-dropdown"
              align="end"
              onMouseEnter={() => setShowProfileCard(true)}
              onMouseLeave={() => setShowProfileCard(false)}
            >
              {isLoggedIn ? (
                <>
                  <ProfileCard />
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
  );
};

export default NavBar;
