import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./ResultFilters.css";
import { Filters } from "../parksearch/ParkSearchForm";

interface ResultFiltersProps {
  onApply: () => void;
  onReset: () => void;
  filters: Filters;
}

const ResultFilters = ({ onApply, onReset, filters }: ResultFiltersProps) => {
  const [isToilet, setIsToilet] = useState<boolean | undefined>(
    filters.isToilet
  );
  const [isCoffeeShop, setIsCoffeeShop] = useState<boolean | undefined>(
    filters.isCoffeeShop
  );
  const [busyness, setBusyness] = useState<string | undefined>(
    filters.busyness
  );

  useEffect(() => {
    onApply();
  }, [isToilet, isCoffeeShop, busyness, filters]);

  const handleReset = () => {
    setIsToilet(undefined);
    setIsCoffeeShop(undefined);
    setBusyness("");
    onReset();
  };

  const handleCheckboxChange =
    (setter: (value: boolean | undefined) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked ? true : undefined;
      setter(checked);
      console.log(event.target);
      if (event.target.id == "toiletSelect") {
        filters.isToilet = checked;
      }
      if (event.target.id == "coffeeShopSelect") {
        filters.isCoffeeShop = checked;
      }
    };

  //set multiple busyness filters but must be reset by reset button
  // const handleBusynessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setBusyness(event.target.value);
  //   filters.busyness = event.target.value;
  // };

  // select one busyness filter but can uncheck the box
  const handleBusynessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBusyness((prevBusyness) => (prevBusyness === value ? undefined : value)); // Toggle the checkbox
    filters.busyness = busyness === value ? undefined : value;
  };

  return (
    <div className="filter-container">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="busynessSelect">
              <Form.Label className="form-label">Busyness Level</Form.Label>
              <Form.Check
                type="checkbox"
                label="Low Busyness"
                value="low"
                checked={busyness === "low"}
                onChange={handleBusynessChange}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Medium Busyness"
                value="medium"
                checked={busyness === "medium"}
                onChange={handleBusynessChange}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="High Busyness"
                value="high"
                checked={busyness === "high"}
                onChange={handleBusynessChange}
                style={{ borderRadius: "20px" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="toiletSelect">
              <Form.Label className="form-label">Amenities</Form.Label>
              <Form.Check
                type="checkbox"
                label="Toilet"
                checked={isToilet === true}
                onChange={handleCheckboxChange(setIsToilet)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Playground"
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Benches"
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Shelter"
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Water Fountain"
                style={{ borderRadius: "20px" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="coffeeShopSelect">
              <Form.Label className="form-label">Food & Drink</Form.Label>
              <Form.Check
                type="checkbox"
                label="Coffee Shop"
                checked={isCoffeeShop === true}
                onChange={handleCheckboxChange(setIsCoffeeShop)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Restaurant"
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Bar"
                style={{ borderRadius: "20px" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="coffeeShopSelect">
              <Form.Label className="form-label">Features</Form.Label>
              <Form.Check
                type="checkbox"
                label="Garden"
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                type="checkbox"
                label="Decorative Fountain"
                style={{ borderRadius: "20px" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="light"
              onClick={handleReset}
              style={{
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              Reset All Filters
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ResultFilters;
