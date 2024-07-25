/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { scroller } from "react-scroll";
import useLocalStorage from "../../hooks/useLocalStorage";
import ProfileCard from "./ProfileCard";
import logo from "../../assets/NYC PARK FINDER LOGO.svg";
import "./NavBar.css";

const NavBar: React.FC = () => {
  const [token, setToken] = useLocalStorage("token");
  const [userFirstName, setUserFirstName] = useLocalStorage("userFirstName");
  const navigate = useNavigate();
  const [showProfileCard, setShowProfileCard] = useState(false);
  const location = useLocation();

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

  const isActive = (path: string) => {
    return location.pathname === path ? "nav-link-active" : "";
  };

  const handleNavLinkClick = (hash: string) => {
    if (location.pathname === "/") {
      scroller.scrollTo(hash, {
        smooth: true,
        duration: 200,
        offset: -70,
      });
    } else {
      navigate(`/#${hash}`);
    }
  };

  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace("#", "");
      scroller.scrollTo(hash, {
        smooth: true,
        duration: 200,
        offset: -70,
      });
    }
  }, [location]);

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
          <Navbar.Brand style={{ cursor: "pointer" }}>
            <img
              src={logo}
              alt="NYC ParkFinder"
              style={{
                height: "3.5rem",
                marginTop: "-0.5rem",
                cursor: "pointer",
              }}
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link className={isActive("/")}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/heatmap">
              <Nav.Link className={isActive("/heatmap")}>Maps</Nav.Link>
            </LinkContainer>
            <Nav.Link
              as="span"
              className={isActive("/#natParks")}
              onClick={() => handleNavLinkClick("natParks")}
            >
              National Parks
            </Nav.Link>
            <LinkContainer to="/eventcalendar">
              <Nav.Link className={isActive("/eventcalendar")}>
                Event Calendar
              </Nav.Link>
            </LinkContainer>
            <Nav.Link
              as="span"
              className={isActive("/#aboutSection")}
              onClick={() => handleNavLinkClick("aboutSection")}
            >
              About
            </Nav.Link>
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
