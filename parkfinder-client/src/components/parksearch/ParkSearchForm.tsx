import React, { useState, useEffect } from "react";
import { getParks, convertToTimestamp } from "../../services/parks";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Toast,
  ToastContainer,
  Spinner,
} from "react-bootstrap";
import GoogleSearchBar from "./GoogleSearchBar";
import Multiselect from "multiselect-react-dropdown";

export interface Filters {
  isToilet?: boolean;
  isCafe?: boolean;
  busyness?: string;
  isToiletHandicapAccess?: boolean;
  isPlayground?: boolean;
  isRestaurant?: boolean;
  isShelter?: boolean;
  isDrinkingWater?: boolean;
  isBar?: boolean;
  isBench?: boolean;
  isGarden?: boolean;
  isFountain?: boolean;
  isMonument?: boolean;
}

export interface LocationData {
  lat: number;
  lng: number;
}

interface ParkSearchFormProps {
  onSubmit: (
    location: LocationData,
    date: string,
    time: string,
    filters: Filters
  ) => void;
  withShadow?: boolean;
}

function ParkSearchForm({ onSubmit, withShadow = false }: ParkSearchFormProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filters, setFilters] = useState<Filters>({});
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);

    const now = new Date();
    const minutes = Math.ceil(now.getMinutes() / 15) * 15;
    now.setMinutes(minutes);
    const hours = String(now.getHours()).padStart(2, "0");
    const roundedMinutes = String(now.getMinutes()).padStart(2, "0");
    const currentTime = `${hours}:${roundedMinutes}`;
    setTime(currentTime);
  }, []);

  function handleSelectLocation(lat: number, lng: number) {
    setLocation({ lat, lng });
  }

  function onFiltersSelect(selectedList: string[]) {
    setFilters({
      isToilet: selectedList.includes("Toilet") ? true : undefined,
      isToiletHandicapAccess: selectedList.includes("Accessible Toilet")
        ? true
        : undefined,
      isCafe: selectedList.includes("Cafe") ? true : undefined,
      isRestaurant: selectedList.includes("Restaurant") ? true : undefined,
      isPlayground: selectedList.includes("Playground") ? true : undefined,
      isBench: selectedList.includes("Benches") ? true : undefined,
      isShelter: selectedList.includes("Shelter") ? true : undefined,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (location) {
      setIsLoading(true);
      const timestamp = convertToTimestamp(date, time);
      try {
        const parksResult = await getParks(
          location.lat,
          location.lng,
          timestamp
        );

        onSubmit(location, date, time, filters);
        navigate("/results", {
          state: { parks: parksResult, filters: filters },
        });
      } catch (error) {
        setShowToast(true);
      } finally {
      }
      setIsLoading(false);
    } else {
      setShowToast(true);
    }
  }

  const customStyles = {
    searchBox: {
      borderRadius: "6px",
      height: "calc(1.4em + 0.75rem + 2px)",
      lineHeight: "10px",
      maxHeight: "10rem",
      border: "1px solid #dee2e6",
    },
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className={`search-form ${withShadow ? "with-shadow" : ""}`}
      >
        <Row className="align-items-center">
          <Col xs={12} sm={12} md={12} lg={3}>
            <Form.Group className="form-row" controlId="location">
              <GoogleSearchBar onSelectLocation={handleSelectLocation} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2}>
            <Form.Group className="form-row" controlId="date">
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Date")}
                placeholder="Date"
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2}>
            <Form.Group className="form-row" controlId="time">
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Time"
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={12} lg={3}>
            <Form.Group
              className="form-row"
              id="multiselect"
              controlId="filters"
            >
              <Multiselect
                isObject={false}
                onRemove={onFiltersSelect}
                onSelect={onFiltersSelect}
                options={[
                  "Toilet",
                  "Accessible Toilet",
                  "Cafe",
                  "Restaurant",
                  "Playground",
                  "Benches",
                  "Shelter",
                ]}
                style={customStyles}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2}>
            <button type="submit" className="search-button">
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Search"
              )}
            </button>
          </Col>
        </Row>
      </Form>
      <ToastContainer
        position="top-center"
        className="p-3"
        style={{ position: "fixed", top: "20px", right: "20px", zIndex: 1050 }}
      >
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg="light"
        >
          <Toast.Header style={{ color: "white", backgroundColor: "grey" }}>
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>Please select a location.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ParkSearchForm;
