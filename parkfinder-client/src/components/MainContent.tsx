import { Container, Row, Col } from "react-bootstrap";
import ParkSearchForm from "./ParkSearchForm";
import "./MainContent.css";

function MainContent() {
  const handleSearchSubmit = (
    park: string,
    date: string,
    preference: string
  ) => {
    // Search logic
    console.log({ park, date, preference });
  };
  return (
    <Container className="main-content">
      <Row className="justify-content-start align-items-start heading-row">
        <Col xs={12} md={12} lg={12}>
          <h1 className="main-heading">Find Your Perfect Park</h1>
          <p className="tag-line">Nature is just a few clicks away</p>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center search-row">
        <Col xs={12} md={12} lg={10}>
          <ParkSearchForm onSubmit={handleSearchSubmit} />
        </Col>
      </Row>
    </Container>
  );
}

export default MainContent;
