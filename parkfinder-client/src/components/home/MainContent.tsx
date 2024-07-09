import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ParkSearchForm from "../parksearch/ParkSearchForm";
import ParkCard from "../parkcard/ParkCard";
import HeroImage from "./HeroImage";
import CustomFooter from "./CustomFooter";
import "./MainContent.css";

function MainContent() {
  const [typingKey, setTypingKey] = useState<number>(0);
  const navigate = useNavigate();

  const handleSearchSubmit = (
    location: { lat: number; lng: number },
    date: string,
    time: string,
    preference: string
  ) => {
    console.log({ location, date, time, preference });
  };

  const popularParks = [
    {
      name: "Central Park",
      image: "/staticparkimages/centralp.jpeg",
      isToilet: 1,
      isCoffeeShop: 1,
    },
    {
      name: "Bryant Park",
      image: "/staticparkimages/bryantp.jpeg",
      isToilet: 1,
      isCoffeeShop: 1,
    },
    {
      name: "The High Line",
      image: "/staticparkimages/highline.jpg",
      isToilet: 1,
      isCoffeeShop: 1,
    },
    {
      name: "Washington Square Park",
      image: "/staticparkimages/washington.jpg",
      isToilet: 1,
      isCoffeeShop: 1,
    },
    //etc.
  ];

  const scrollToSearchForm = () => {
    document
      .getElementById("search-form-div")
      ?.scrollIntoView({ behavior: "smooth" });
    setTypingKey((prevKey) => prevKey + 1);
  };

  const navigateToNationalParks = () => {
    navigate("/nationalparks");
  };

  return (
    <>
      <Container className="main-content">
        <HeroImage />
        <Row className="justify-content-start align-items-start heading-row">
          <Col xs={12} md={12} lg={12}>
            <h1 className="main-heading">Find Your Perfect Park.</h1>
            <span id="tagline">
              Nature is just a click away. <br />
              Find events, check busyness, explore amenities.
            </span>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={12} lg={10}>
            <button
              type="submit"
              onClick={scrollToSearchForm}
              className="jump-button"
            >
              Get started
            </button>
            {/* <ParkSearchForm onSubmit={handleSearchSubmit} /> */}
          </Col>
        </Row>
      </Container>
      <div className="search-form-div" id="search-form-div">
        {/* <Container > */}
        <Row className="justify-content-center align-items-center search-row">
          <Col xs={12} md={12} lg={10}>
            <h1 className="search-heading">Search for a Park</h1>
            <span key={typingKey} className="search-description">
              Simply enter your location to get started.
            </span>
            <div className="search-component">
              <ParkSearchForm onSubmit={handleSearchSubmit} withShadow={true} />
            </div>
          </Col>
        </Row>
        {/* </Container> */}
      </div>
      <div className="card-section">
        <Col xs={12}>
          <h2 className="section-heading">Popular Parks</h2>
          <Container>
            <Row className="card-row">
              {popularParks.map((park, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <ParkCard
                    parkName={park.name}
                    image={park.image}
                    isCoffeeShop={park.isCoffeeShop}
                    isToilet={park.isToilet}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </div>
      <div className="nat-parks-section">
        <Col xs={12}>
          <div className="nat-parks-content">
            <h2 className="nat-parks-heading">
              Explore the National Parks of NYC.
            </h2>
            <span className="nat-parks-link">
              <p>
                New York State is home to 24 National Park Sites. 10 are in New
                York City. <br /> Click the button to learn more.
              </p>
              <button
                className="nat-park-button"
                type="submit"
                onClick={navigateToNationalParks}
              >
                Find out more
              </button>
            </span>
          </div>
        </Col>
      </div>
      <CustomFooter />
    </>
  );
}

export default MainContent;
