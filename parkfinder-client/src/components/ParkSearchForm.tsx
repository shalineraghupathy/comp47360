import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

interface ParkSearchFormProps {
  onSubmit: (park: string, date: string, preference: string) => void;
}

function ParkSearchForm({ onSubmit }: ParkSearchFormProps) {
  const [park, setPark] = useState("");
  const [date, setDate] = useState("");
  const [preference, setPreference] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    // prevent default submission behaviour (page reload)
    e.preventDefault();
    onSubmit(park, date, preference);
  };

  return (
    <Form onSubmit={handleSubmit} className="search-form">
      <Row className="align-items-center">
        <Col xs={12} sm={12} md={12} lg={3}>
          <Form.Group controlId="park">
            {/* <Form.Label className="sr-only">I'm looking for:</Form.Label> */}
            <Form.Control
              as="select"
              value={park}
              onChange={(e) => setPark(e.target.value)}
            >
              <option value="disabled selected hidden">
                I'm looking for...
              </option>
              <option value="all">All Parks</option>
              {/* add more options as needed */}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={12} lg={2}>
          <Form.Group controlId="date">
            {/* <Form.Label className="sr-only">When:</Form.Label> */}
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={12} lg={3}>
          <Form.Group controlId="preference">
            {/* <Form.Label className="sr-only">Preferences:</Form.Label> */}
            <Form.Control
              as="select"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
            >
              <option value="disabled selected hidden">Amenities</option>
              <option value="amenities">Amenities</option>
              {/* add more options as needed */}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={12} lg={2}>
          <Form.Group controlId="busyness">
            <Form.Control
              as="select"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
            >
              <option value="disabled selected hidden">Busyness</option>
              <option value="low">Low</option>
              <option value="med">Medium</option>
              <option value="high">High</option>
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
