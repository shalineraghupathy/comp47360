import { Container, Row, Col } from "react-bootstrap";
import ParkSearchForm from "../parksearch/ParkSearchForm";
import ParkCard from "../parkcard/ParkCard";
import "./MainContent.css";
import HeroImage from "./HeroImage";

function MainContent() {
  const handleSearchSubmit = (
    park: string,
    date: string,
    preference: string
  ) => {
    // Search logic
    console.log({ park, date, preference });
  };

  const popularParks = [
    {
      name: "Central Park",
      image:
        "https://media.cntraveler.com/photos/55f9aa4cc753332a5bcdfbb1/16:9/w_2560%2Cc_limit/central-park-nyc-cr-getty.jpg",
      link: "More",
    },
    {
      name: "Prospect Park",
      image:
        "https://media.cntraveler.com/photos/55f9aa4cc753332a5bcdfbb1/16:9/w_2560%2Cc_limit/central-park-nyc-cr-getty.jpg",
      link: "More",
    },
    {
      name: "Battery Park",
      image:
        "https://media.cntraveler.com/photos/55f9aa4cc753332a5bcdfbb1/16:9/w_2560%2Cc_limit/central-park-nyc-cr-getty.jpg",
      link: "More",
    },
    {
      name: "Another Park",
      image:
        "https://media.cntraveler.com/photos/55f9aa4cc753332a5bcdfbb1/16:9/w_2560%2Cc_limit/central-park-nyc-cr-getty.jpg",
      link: "More",
    },
    //etc.
  ];

  return (
    <>
      <Container className="main-content">
        <HeroImage />
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
      <div className="card-section">
        <Col xs={12}>
          <h2 className="section-heading">Popular Parks</h2>
          <Row className="card-row">
            {popularParks.map((park, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ParkCard
                  name={park.name}
                  image={park.image}
                  link={park.link}
                />{" "}
              </Col>
            ))}
          </Row>
        </Col>
      </div>
    </>
  );
}

export default MainContent;
