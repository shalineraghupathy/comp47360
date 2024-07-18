/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import ResultCard from "./ResultCard";
import ParkSearchForm, { Filters } from "../parksearch/ParkSearchForm";
import ResultFilters from "./ResultFilters";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  getParks,
  convertToTimestamp,
  filterParks,
} from "../../services/parks";
import { LocationData } from "../parksearch/ParkSearchForm";
import CustomFooter from "../home/CustomFooter";
import "./Results.css";

interface Park {
  distance: number;
  parkName: string;
  busyness: number;
  isCafe: number;
  isToilet: number;
  isPlayground: number;
  isToiletHandicapAccess: number;
  isRestaurant: number;
  isShelter: number;
  isDrinkingWater: number;
  isBar: number;
  isBench: number;
  isGarden: number;
  isFountain: number;
  isMonument: number;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialParks = location.state?.fullParksList || [];
  const initialFilteredParks = location.state?.filteredParks || initialParks;
  const initialFilters = location.state?.filters || {};

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [fullParksList, setFullParksList] = useState<Park[]>(initialParks);
  const [filteredParks, setFilteredParks] =
    useState<Park[]>(initialFilteredParks);
  const [searchKey, setSearchKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (fullParksList.length > 0) {
      handleApplyFilters();
    }
  }, [filters]);

  const handleApplyFilters = () => {
    const filtered = filterParks(filters, fullParksList);
    setFilteredParks(filtered);
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  const handleResetFilters = () => {
    setFilters({});
    setFilteredParks(fullParksList);
  };

  const handleSearchSubmit = async (
    location: LocationData,
    date: string,
    time: string,
    filters: Filters
  ) => {
    const timestamp = convertToTimestamp(date, time);
    setFilters(filters);

    const parks = await getParks(location.lat, location.lng, timestamp);
    setFullParksList(parks);
    setFilteredParks(parks);
    setSearchKey(searchKey + 1);
  };

  const sortedParks = filteredParks.sort((a, b) => a.distance - b.distance);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentParks = sortedParks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedParks.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to the top when the page changes
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to the top when the page changes
    }
  };

  const handleViewMap = () => {
    navigate("/resultsmap", {
      state: { fullParksList, filteredParks, filters },
    });
  };

  return (
    <>
      <Container className="results-container" key={searchKey}>
        <div>
          <ParkSearchForm onSubmit={handleSearchSubmit} />
          <Row>
            <Col xs={12} sm={12} md={12} lg={3}>
              <div className="left-column">
                <div className="map-link-container">
                  <Card style={{ width: "16rem", borderRadius: "20px" }}>
                    <img
                      style={{ height: "8rem", objectFit: "cover" }}
                      className="card-img-top"
                      src="./staticparkimages/mapview.png"
                      alt="Card image cap"
                    />
                    <Button
                      onClick={handleViewMap}
                      className="card-body"
                      style={{
                        textAlign: "center",
                        textDecoration: "none",
                        padding: "0.5rem",
                      }}
                    >
                      View map
                    </Button>
                  </Card>
                </div>
                <div className="filter-section">
                  <h5>Filter by</h5>
                  <ResultFilters
                    onApply={handleApplyFilters}
                    onReset={handleResetFilters}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={9}>
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
                See the results of your search below and apply additional
                filters using the sidebar
              </p>
              <div className="cards-container">
                {currentParks.map((parkResult: Park, index: number) => (
                  <ResultCard
                    key={index}
                    parkName={parkResult.parkName}
                    distance={parkResult.distance}
                    busyness={parkResult.busyness}
                    isCafe={parkResult.isCafe}
                    isToilet={parkResult.isToilet}
                    isPlayground={parkResult.isPlayground}
                    isToiletHandicapAccess={parkResult.isToiletHandicapAccess}
                    isRestaurant={parkResult.isRestaurant}
                    isShelter={parkResult.isShelter}
                    isDrinkingWater={parkResult.isDrinkingWater}
                    isBar={parkResult.isBar}
                    isBench={parkResult.isBench}
                    isGarden={parkResult.isGarden}
                    isFountain={parkResult.isFountain}
                    isMonument={parkResult.isMonument}
                  />
                ))}
              </div>
              <div className="pagination" style={{ float: "right" }}>
                <Button
                  variant="link"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  size="sm"
                >
                  <FaChevronLeft />
                </Button>
                <span style={{ padding: "1rem" }}>
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="link"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  size="sm"
                >
                  <FaChevronRight />
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <CustomFooter />
    </>
  );
};

export default Results;
