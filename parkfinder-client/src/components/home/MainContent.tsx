import React, { useState } from "react";
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
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );
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

  const toggleQuestion = (index: number) => {
    // Added function to toggle question visibility
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqItems = [
    // Added FAQ items array
    {
      question: "What is NYC ParkFinder?",
      answer: "NYC Park Finder is an online tool to help you discover and explore parks in New York City. You can search for amenities, events, and more. We hope to inspire our users to discover the joy of being oudoors and active in a selection of parks around Manhattan."
    },
    {
      question: "How do I use the park search feature?",
      answer: "Simply enter or select your location, date, time and preferred amenities to find parks near you, with real-time crowd information."
    },
    {
      question: "Can I see amenities available in the parks?",
      answer: "Yes, you can view various amenities such as toilets, cafés, playgrounds, and more for each park."
    },
    {
      question: "Why should I create a personal profile?",
      answer: "It is not neccessary to create a user profile to enjoy the full NYC ParkFinder experience. When users are logged in with their personal account, they can save their favourite parks for quicker access and easier planning at a later stage."
    },
    {
      question: "How can I find out about events taking place in parks?",
      answer: "You can select 'Event Calendar' in the navigation bar at the top of page. Users can discover a selection of events taking place in Central Park. Dates and time serch filters can be used to gain insights into current and future events. We hope to expand this feature to other parks to enhance our user's experience."
    },
    {
      question: "How can I use the 'maps' feature to help plan my visit?",
      answer: "Users can rely on the map to visualise the level of busyness in different areas of Manhattan at a glance. We hope to add a route planner to this feature in the future, for more effective journey planning."
    }, 
    {
      question: "Is NYC ParkFinder free to use?",
      answer: "Yes, NYC ParkFinder is completely free to use for everyone. An internet connection is required, however."
    },
    {
      question: "Is there a mobile app version of NYC ParkFinder?",
      answer: "Not at this moment. There are plans to develop a mobile app in the near future. For now, enjoy all that our website has to offer from the comfort of your home or workspace!"
    }
  ];

  return (
    <>
      <Container className="main-content">
        <HeroImage />
        <Row className="justify-content-start align-items-start heading-row">
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className="main-heading">Find Your Perfect Park.</h1>
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
                cursor: "pointer",
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
                cursor: "pointer",
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
          <p className="faq-description">Discover more about our website here</p>
          <div className="faq">
            {faqItems.map((item, index) => ( // Added map function to render the FAQ items
              <div
                key={index}
                className={`faq-question ${openQuestionIndex === index ? 'open' : ''}`}
                onClick={() => toggleQuestion(index)}
              >
                <h4>{item.question} <span className="faq-arrow">{openQuestionIndex === index ? '▲' : '▼'}</span></h4>
                {openQuestionIndex === index && (
                  <p className="faq-answer">
                    {item.answer.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                )}
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
