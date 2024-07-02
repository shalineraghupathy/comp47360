import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./NavBar.css";

function NavBar() {
  // /* This function renders a simple nav bar styled using bootstrap. Displays a logo aligned to the left and nav links aligned right. The final link is a dropdown menu. */
  return (
    <Navbar
      className="Navbar"
      expand="lg"
      fixed="top"
      sticky="top"
      style={{
        paddingLeft: "4rem",
        paddingRight: "4rem",
        paddingTop: "0rem",
        paddingBottom: "0rem",
      }}
    >
      {/* {/* This is equivalent to className='container-fluid'. Container ensures grid adherence. */}
      <Container>
        {/* Brand subcomponent */}
        <LinkContainer to="/">
          <Navbar.Brand id="logo" href="#">
            ParkFinder
          </Navbar.Brand>
        </LinkContainer>
        {/* Adds a toggle for collapsible content on small screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Makes links collapsible */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav component, applies ms-auto, pushes nav links to right */}
          <Nav
            className="ms-auto"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <Nav.Link href="#">Map View</Nav.Link>
            <Nav.Link href="#">Amenities</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <LinkContainer to="/signup">
              <Nav.Link>
                <Button
                  type="submit"
                  className="search-button"
                  style={{
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    backgroundColor: "rgba(46, 139, 87)",
                    borderRadius: "30px",
                    border: "0",
                  }}
                >
                  Login
                </Button>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
