import React, { useState, useEffect } from "react";
import { Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import GoogleSearchBar from "./GoogleSearchBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ParkSearchFormProps {
  onSubmit: (
    location: { lat: number; lng: number },
    date: string,
    time: string,
    preference: string
  ) => void;
}

function ParkSearchForm({ onSubmit }: ParkSearchFormProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [preference, setPreference] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Set the default date to today
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

  async function getParks(userLat: number, userLon: number, playTime: number) {
    try {
      const response = await axios.get(
        `http://localhost:8080/parks/findNearby?userLat=${userLat}&userLon=${userLon}&playTime=${playTime}`
      );

      console.log("Parks fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching parks:", error);
      throw error;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (location) {
      console.log("Latitude:", location.lat);
      console.log("Longitude:", location.lng);
      console.log("Date:", date);
      console.log("Time:", time);
      console.log("Preference:", preference);

      const timestamp = Math.floor(
        new Date(`${date}T${time}`).getTime() / 1000
      );
      try {
        const parksResult = await getParks(
          location.lat,
          location.lng,
          timestamp
        );
        const formData = {
          latitude: location.lat,
          longitude: location.lng,
          date: date,
          time: time,
          preference: preference,
        };

        const formDataJson = JSON.stringify(formData);
        console.log("Form data as JSON:", formDataJson);

        onSubmit(location, date, time, preference);
        navigate("/results", { state: { parks: parksResult } });
      } catch (error) {
        setShowToast(true);
      }
    } else {
      setShowToast(true);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className="search-form">
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
            <Form.Group className="form-row" controlId="preference">
              <Form.Control
                as="select"
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
              >
                <option value="" disabled>
                  Amenities
                </option>
                <option value="toilets">Toilets</option>
                <option value="playground">Playground</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} sm={12} md={12} lg={2}>
            <button type="submit" className="search-button">
              Search
            </button>
          </Col>
        </Row>
      </Form>
      <ToastContainer
        position="top-center"
        className="p-3"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1050,
        }}
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
