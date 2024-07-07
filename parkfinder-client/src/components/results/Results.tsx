import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import ResultCard from "./ResultCard";
import ParkSearchForm from "../parksearch/ParkSearchForm";
import ResultFilters from "./ResultFilters";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const parksResult = location.state?.parks || [];
  const [filteredParks, setFilteredParks] = useState(parksResult);

  function handleApplyFilters(filters) {
    const filtered = parksResult.filter((park) => {
      let match = true;

      if (filters.isToilet !== undefined) {
        match = match && park.park.isToilet === (filters.isToilet ? 1 : 0);
      }

      if (filters.isCoffeeShop !== undefined) {
        match =
          match && park.park.isCoffeeShop === (filters.isCoffeeShop ? 1 : 0);
      }

      if (filters.busyness) {
        const [min, max] = busynessRange(filters.busyness);
        match = match && park.busyness >= min && park.busyness <= max;
      }
      return match;
    });

    setFilteredParks(filtered);
  }

  function handleResetFilters() {
    setFilteredParks(parksResult);
  }

  const handleSearchSubmit = (
    park: string,
    date: string,
    preference: string
  ) => {
    console.log({ park, date, preference });
  };

  function busynessRange(category: string): [number, number] {
    if (category === "high") {
      return [66, 100];
    } else if (category === "medium") {
      return [33, 65];
    } else if (category === "low") {
      return [0, 32];
    }
  }

  return (
    <Container className="results-container">
      <div>
        <ParkSearchForm
          className="results-search-form"
          onSubmit={handleSearchSubmit}
        />
        <Row>
          <Col xs={12} s={12} md={12} lg={3}>
            <div className="left-column">
              <div className="map-link-container">
                <Card style={{ width: "16rem", borderRadius: "20px" }}>
                  <img
                    style={{ height: "8rem", objectFit: "cover" }}
                    className="card-img-top"
                    src="https://observer.com/wp-content/uploads/sites/2/2015/02/screen-shot-2015-02-06-at-3-25-41-pm.png?quality=80"
                    alt="Card image cap"
                  />
                  <a
                    href="#"
                    className="card-body"
                    style={{
                      textAlign: "center",
                      textDecoration: "none",
                      padding: "0.5rem",
                    }}
                  >
                    View map
                  </a>{" "}
                </Card>
              </div>
              <div className="filter-section">
                <h5>Filter by</h5>
                <ResultFilters
                  onApply={handleApplyFilters}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          </Col>
          <Col xs={12} s={12} md={12} lg={9}>
            <h3 className="results-heading">Park Search Results</h3>
            <div className="cards-container">
              {filteredParks.map((parkResult: any, index: number) => (
                <ResultCard
                  key={index}
                  parkName={parkResult.park.parkName}
                  distance={parkResult.distance}
                  busyness={parkResult.busyness}
                  entrances={parkResult.park.entrances}
                  isCoffeeShop={parkResult.park.isCoffeeShop}
                  isToilet={parkResult.park.isToilet}
                  parkEntrance={parkResult.park.parkEntrance}
                />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Results;
