import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function NavBar() {
  /* This function renders a simple nav bar styled using bootstrap. Displays a logo aligned to the left and nav links aligned right. The final link is a dropdown menu. */
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
      {/* {/* This is equivalent to className='container-fluid'. Container ensures grid adherence. */}
      <Container fluid>
        {/* Brand subcomponent */}
        <Navbar.Brand href="#">ParkFinder</Navbar.Brand>
        {/* Adds a toggle for collapsible content on small screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* Makes links collapsible */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav component, applies ms-auto, pushes nav links to right */}
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Park Search</Nav.Link>
            <Nav.Link href="#">Amenities</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            {/* Possibly unnecessary dropdown. */}
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">1</NavDropdown.Item>
              <NavDropdown.Item href="#">2</NavDropdown.Item>
              <NavDropdown.Item href="#">3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
