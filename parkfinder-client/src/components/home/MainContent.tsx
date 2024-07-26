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
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null); 
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

  const toggleQuestion = (index: number) => { // Added function to toggle question visibility
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqItems = [ // Added FAQ items array
    {
      question: "What is NYC Park Finder?",
      answer: "NYC Park Finder is a tool to help you discover and explore parks in New York City."
    },
    {
      question: "How do I use the park search feature?",
      answer: "Simply enter your location, date, time, and select your preferred amenities to find parks near you n/ with real-time crowd info."
    },
    {
      question: "Can I see amenities available in the parks?",
      answer: "Yes, you can view various amenities such as toilets, cafes, playgrounds, and more for each park."
    },
    {
      question: "Is NYC Park Finder free to use?",
      answer: "Yes, NYC Park Finder is completely free to use for everyone."
    },
    {
      question: "Is there a mobile app version of NYC Park Finder?",
      answer: "No, however there are plans to develop a mobile app in the near future."
    }
  ];

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
              Get Started
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
                Explore the National Parks of NYC
              </h2>
              <span className="nat-parks-link">
                <p>
                  New York State is home to 24 National Park Sites. 
                  <br /> 
                  10 of these parks are located in New York City. 
                </p>
                <p>
                  Click the button to learn more.
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
          <div className="faq">
            {faqItems.map((item, index) => ( // Added map function to render FAQ items
              <div
                key={index}
                className={`faq-question ${openQuestionIndex === index ? 'open' : ''}`}
                onClick={() => toggleQuestion(index)}
              >
                <h4>{item.question} <span className="faq-arrow">{openQuestionIndex === index ? '▲' : '▼'}</span></h4>
                {openQuestionIndex === index && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </div>
      </Element>     
      <CustomFooter />
    </>
  );
}

export default MainContent;
