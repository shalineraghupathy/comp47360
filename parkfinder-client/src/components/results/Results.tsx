/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ResultCard from "./ResultCard";
import ParkSearchForm, { Filters } from "../parksearch/ParkSearchForm";
import ResultFilters from "./ResultFilters";
import "./Results.css";
import { getParks, convertToTimestamp } from "../../services/parks";
import { LocationData } from "../parksearch/ParkSearchForm";
import { filterParks } from "../../services/parks";

const Results = () => {
  const location = useLocation();
  const parksResult = location.state?.parks || [];
  const [filters, setFilters] = useState(location.state?.filters || {});

  const [filteredParks, setFilteredParks] = useState(parksResult);
  const [searchKey, setSearchKey] = useState(0);

  function handleApplyFilters() {
    const filtered = filterParks(filters, parksResult);
    setFilteredParks(filtered);
  }

  function handleResetFilters() {
    setFilters({});
    setFilteredParks(parksResult);
  }

  const handleSearchSubmit = async (
    location: LocationData,
    date: string,
    time: string,
    filters: Filters
  ) => {
    const timestamp = convertToTimestamp(date, time);
    setFilters(filters);

    const parks = await getParks(location.lat, location.lng, timestamp);
    setFilteredParks(parks);

    handleApplyFilters();
    setSearchKey(searchKey + 1);
  };

  return (
    <Container className="results-container" key={searchKey}>
      <div>
        <ParkSearchForm onSubmit={handleSearchSubmit} />
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
                  filters={filters}
                />
              </div>
            </div>
          </Col>
          <Col xs={12} s={12} md={12} lg={9}>
            <p className="results-heading">
              <i
                className="fa fa-search"
                aria-hidden="true"
                style={{
                  marginLeft: "1rem",
                  marginRight: "1rem",
                  fontSize: "1.25rem",
                  padding: "0.5rem",
                  borderRadius: "40px",
                  border: "2px solid white",
                }}
              ></i>
              See the results of your search below and apply additional filters
              using the sidebar
            </p>
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
