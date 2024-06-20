import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import GoogleSearchBar from "./GoogleSearchBar";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  function handleSelectLocation(lat: number, lng: number) {
    setLocation({ lat, lng });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (location) {
      //Submission POSTed to backend here in future
      console.log("Latitude:", location.lat);
      console.log("Longitude:", location.lng);
      console.log("Date:", date);
      console.log("Time:", time);
      console.log("Preference:", preference);

      //as json
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
      navigate("/results");
    } else {
      alert("Please select a location");
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="search-form">
      <Row className="align-items-center">
        <Col xs={12} sm={12} md={12} lg={3}>
          <Form.Group controlId="location">
            <GoogleSearchBar onSelectLocation={handleSelectLocation} />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={12} lg={2}>
          <Form.Group controlId="date">
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={12} lg={2}>
          <Form.Group controlId="time">
            <Form.Control
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Time"
              step="3600" //1hr - need to fix seconds input
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3}>
          <Form.Group controlId="preference">
            <Form.Control
              as="select"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
            >
              <option value="" disabled selected hidden>
                Amenities
              </option>
              <option value="toilets">Toilets</option>
              <option value="playground">Playground</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={12} lg={2}>
          <Button variant="success" type="submit" className="search-button">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ParkSearchForm;

// Range slider code
/* <Col xs={12} sm={12} md={12} lg={8}>
<Form.Group controlId="range">
  <Form.Control
    type="range"
    className="form-range"
    min="0"
    max="100"
    value={rangeValue}
    onChange={(e) => setRangeValue(parseInt(e.target.value))}
  />
  <Form.Text className="text-muted">
    How Busy? {rangeValue}/100
  </Form.Text>
</Form.Group>
</Col> */
