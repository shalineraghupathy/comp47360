/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import GoogleMapComponent from "../maps/ProjectsMap";
import { filterParks } from "../../services/parks";
import { Filters } from "../parksearch/ParkSearchForm";
import FilterModal from "./filterModal";
import "./resultsMapview.css"; // Custom CSS for styling

const ResultsMapView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFilters = location.state?.filters || {};
  const initialFullParksList = location.state?.fullParksList || [];
  const initialFilteredParks =
    location.state?.filteredParks || initialFullParksList;
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [fullParksList, setFullParksList] =
    useState<any[]>(initialFullParksList);
  const [filteredParks, setFilteredParks] =
    useState<any[]>(initialFilteredParks);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const applyFilters = () => {
    const filtered = filterParks(filters, fullParksList);
    setFilteredParks(filtered);
    setShowFilterModal(false); // Close the modal after applying filters
  };

  const resetFilters = () => {
    setFilters({});
    setFilteredParks(fullParksList);
    setShowFilterModal(false); // Close the modal after resetting filters
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleBackToResults = () => {
    navigate("/results", { state: { fullParksList, filteredParks, filters } });
  };

  return (
    <Container fluid className="results-map-view">
      <Row>
        <Col xs={12} className="header-section">
          <Button variant="light" onClick={handleBackToResults}>
            <i className="fa fa-chevron-left" aria-hidden="true"></i> Back to
            Results
          </Button>
          <Button
            variant="primary"
            className="filter-button"
            onClick={toggleFilterModal}
          >
            <i className="fa fa-filter" aria-hidden="true"></i> Filter
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="map-section">
          <GoogleMapComponent parks={filteredParks} />
        </Col>
      </Row>
      <FilterModal
        show={showFilterModal}
        handleClose={toggleFilterModal}
        handleApplyFilters={applyFilters}
        handleResetFilters={resetFilters}
        filters={filters}
        setFilters={setFilters}
      />
    </Container>
  );
};

export default ResultsMapView;
