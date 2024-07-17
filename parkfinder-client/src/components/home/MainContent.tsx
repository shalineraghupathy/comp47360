import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import ParkSearchForm, { Filters } from "../parksearch/ParkSearchForm";
import ParkCard from "../parkcard/ParkCard";
import HeroImage from "./HeroImage";
import CustomFooter from "./CustomFooter";
import { Element } from "react-scroll";
import "./MainContent.css";

function MainContent() {
  const [typingKey, setTypingKey] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleSearchSubmit = (
    location: { lat: number; lng: number },
    date: string,
    time: string,
    filters: Filters
  ) => {
    console.log({ location, date, time, filters });
  };

  const popularParks = [
    {
      name: "Central Park",
      image: "/staticparkimages/centralp.jpeg",
      hasToilet: 1,
      hasCafe: 1,
      hasPlayground: 1,
      hasToiletHandicapAccess: 1,
      hasRestaurant: 1,
      hasShelter: 1,
      hasDrinkingWater: 1,
      hasBar: 1,
      hasBench: 1,
      hasGarden: 1,
      hasFountain: 1,
      hasMonument: 1,
    },
    {
      name: "Bryant Park",
      image: "/staticparkimages/bryantp.jpeg",
      hasToilet: 1,
      hasCafe: 1,
      hasPlayground: 1,
      hasToiletHandicapAccess: 1,
      hasRestaurant: 1,
      hasShelter: 1,
      hasDrinkingWater: 1,
      hasBar: 1,
      hasBench: 1,
      hasGarden: 1,
      hasFountain: 1,
      hasMonument: 1,
    },
    {
      name: "The High Line",
      image: "/staticparkimages/highline.jpg",
      hasToilet: 1,
      hasCafe: 1,
      hasPlayground: 1,
      hasToiletHandicapAccess: 1,
      hasRestaurant: 1,
      hasShelter: 1,
      hasDrinkingWater: 1,
      hasBar: 1,
      hasBench: 1,
      hasGarden: 1,
      hasFountain: 1,
      hasMonument: 1,
    },
    {
      name: "Washington Square Park",
      image: "/staticparkimages/washington.jpg",
      hasToilet: 1,
      hasCafe: 1,
      hasPlayground: 1,
      hasToiletHandicapAccess: 1,
      hasRestaurant: 1,
      hasShelter: 1,
      hasDrinkingWater: 1,
      hasBar: 1,
      hasBench: 1,
      hasGarden: 1,
      hasFountain: 1,
      hasMonument: 1,
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
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className="main-heading">NYC PARK FINDER</h1>
            <span className="tagline">
              In Manhattan, nature is just a click away. <br />
              Discover local parks, explore amenities, and plan your perfect
              visit with real-time crowd info.
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
          </Col>
        </Row>
      </Container>
      <div className="search-form-div" id="search-form-div">
        {/* <Container > */}
        <Row className="justify-content-center align-items-center search-row">
          <Col xs={12} md={12} lg={10}>
            <h1 className="search-heading">Search for a Park</h1>
            <span key={typingKey} className="search-description">
              Simply enter your location to see parks near you.
              {/* Add a date and time to
              see predicted busyness, and filter by amenities to discover your
              perfect park. */}
            </span>
            <div className="search-component">
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    Enter a date and time to see predicted busyness.
                  </Tooltip>
                }
              >
                <div className="search-component">
                  <ParkSearchForm
                    onSubmit={handleSearchSubmit}
                    withShadow={true}
                  />
                </div>
              </OverlayTrigger>
            </div>
          </Col>
        </Row>
        {/* </Container> */}
      </div>
      <div className="card-section">
        <Col xs={12}>
          <div className="section-heading">
            <span
              className="popular-heading"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: isHovered ? "whitesmoke" : "seagreen",
                padding: "1rem 1.5rem",
                borderRadius: "30px",
                color: isHovered ? "seagreen" : "whitesmoke",
                fontSize: "1.5rem",
                fontWeight: "550",
                letterSpacing: "1px",
                transition: "all 0.3s ease-in-out",
                marginRight: "1rem",
              }}
            >
              In the Spotlight
            </span>
            <span
              className="section-subtext"
              style={{
                fontSize: "1.5rem",
                backgroundColor: isHovered ? "seagreen" : "whitesmoke",
                padding: "1rem 1.5rem",
                borderRadius: "30px",
                fontWeight: "550",
                letterSpacing: "1px",
                color: isHovered ? "whitesmoke" : "seagreen",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Manhattan's Most Popular Parks
            </span>
          </div>
          <Container>
            <Row className="card-row">
              {popularParks.map((park, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <ParkCard
                    parkName={park.name}
                    image={park.image}
                    hasCafe={park.hasCafe}
                    hasToilet={park.hasToilet}
                    hasPlayground={park.hasPlayground}
                    hasToiletHandicapAccess={park.hasToiletHandicapAccess}
                    hasRestaurant={park.hasRestaurant}
                    hasBar={park.hasBar}
                    hasShelter={park.hasShelter}
                    hasBench={park.hasBench}
                    hasGarden={park.hasGarden}
                    hasFountain={park.hasFountain}
                    hasMonument={park.hasMonument}
                    hasDrinkingWater={park.hasDrinkingWater}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </div>
      <div className="nat-parks-section">
        <Col xs={12}>
          <Element name="natParks">
            <div className="nat-parks-content">
              <h2 className="nat-parks-heading">
                Explore the National Parks of NYC.
              </h2>
              <span className="nat-parks-link">
                <p>
                  New York State is home to 24 National Park Sites. 10 are in
                  New York City. <br /> Click the button to learn more.
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
          </Element>
        </Col>
      </div>
      <Element name="aboutSection">{/* to do: <div>about</div> */}</Element>
      <CustomFooter />
    </>
  );
}

export default MainContent;
