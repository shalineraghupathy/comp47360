import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import ParkSearchForm, { Filters } from "../parksearch/ParkSearchForm";
import ParkCard from "../parkcard/ParkCard";
import HeroImage from "./HeroImage";
import CustomFooter from "./CustomFooter";
import { Element } from "react-scroll";
import { getParks, convertToTimestamp } from "../../services/parks";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./MainContent.css";

function MainContent() {
  const [typingKey, setTypingKey] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const [token] = useLocalStorage("token");

  const handleSearchSubmit = async (
    location: { lat: number; lng: number },
    date: string,
    time: string,
    filters: Filters
  ) => {
    const timestamp = convertToTimestamp(date, time);
    try {
      const parksResult = await getParks(
        location.lat,
        location.lng,
        timestamp,
        token
      );
      navigate("/results", {
        state: {
          fullParksList: parksResult,
          filteredParks: parksResult,
          filters,
        },
      });
    } catch (error) {
      console.error("Error fetching parks: ", error);
    }
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
        <Row className="justify-content-center align-items-center search-row">
          <Col xs={12} md={12} lg={10}>
            <h1 className="search-heading">Search for a Park</h1>
            <span key={typingKey} className="search-description">
              Simply enter your location to see parks near you.
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
      <Element name="aboutSection">
        <div className="faq-section">
          <h2 className="faq-heading">FAQ</h2>
          <span key={typingKey} className="search-description">
            Learn more about NYC Park Finder here
          </span>
          <div className="faq">
            <div className="faq-question">
              <h4>What is NYC Park Finder?</h4>
              <p>
                NYC Park Finder is a tool to help you discover and explore parks
                in New York City.
              </p>
            </div>
            <div className="faq-question">
              <h4>How do I use the park search feature?</h4>
              <p>
                Simply enter your location, date, and time to find parks near
                you with real-time crowd info.
              </p>
            </div>
            <div className="faq-question">
              <h4>Can I see which amenities are available in the parks?</h4>
              <p>
                Yes, you can view various amenities such as toilets, cafes,
                playgrounds, and more for each park.
              </p>
            </div>
            <div className="faq-question">
              <h4>Is NYC Park Finder free to use?</h4>
              <p>
                Yes, NYC Park Finder is completely free to use for everyone.
              </p>
            </div>
            <div className="faq-question">
              <h4>Is there an NYC Park Finder mobile app I can use?</h4>
              <p>
                No, however a mobile app is a feature that we plan to develop in
                the near future
              </p>
            </div>
          </div>
        </div>
      </Element>
      <CustomFooter />
    </>
  );
}

export default MainContent;
