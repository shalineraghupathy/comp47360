/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./ResultFilters.css";
import { Filters } from "../parksearch/ParkSearchForm";

interface ResultFiltersProps {
  onApply: () => void;
  onReset: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const ResultFilters = ({
  onApply,
  onReset,
  filters,
  setFilters,
}: ResultFiltersProps) => {
  const [isToilet, setIsToilet] = useState<boolean | undefined>(
    filters.isToilet
  );
  const [isToiletHandicapAccess, setIsToiletHandicapAccess] = useState<
    boolean | undefined
  >(filters.isToiletHandicapAccess);
  const [isPlayground, setIsPlayground] = useState<boolean | undefined>(
    filters.isPlayground
  );
  const [isRestaurant, setIsRestaurant] = useState<boolean | undefined>(
    filters.isRestaurant
  );
  const [isShelter, setIsShelter] = useState<boolean | undefined>(
    filters.isShelter
  );
  const [isCafe, setIsCafe] = useState<boolean | undefined>(filters.isCafe);
  const [isDrinkingWater, setIsDrinkingWater] = useState<boolean | undefined>(
    filters.isDrinkingWater
  );
  const [isBar, setIsBar] = useState<boolean | undefined>(filters.isBar);
  const [isBench, setIsBench] = useState<boolean | undefined>(filters.isBench);
  const [isGarden, setIsGarden] = useState<boolean | undefined>(
    filters.isGarden
  );
  const [isFountain, setIsFountain] = useState<boolean | undefined>(
    filters.isFountain
  );
  const [isMonument, setIsMonument] = useState<boolean | undefined>(
    filters.isMonument
  );
  const [busyness, setBusyness] = useState<string | undefined>(
    filters.busyness
  );

  const handleReset = () => {
    setIsToilet(undefined);
    setIsCafe(undefined);
    setIsToiletHandicapAccess(undefined);
    setIsPlayground(undefined);
    setIsRestaurant(undefined);
    setIsShelter(undefined);
    setIsDrinkingWater(undefined);
    setIsBar(undefined);
    setIsBench(undefined);
    setIsGarden(undefined);
    setIsFountain(undefined);
    setIsMonument(undefined);
    setBusyness("");
    onReset();
  };

  const handleCheckboxChange =
    (setter: (value: boolean | undefined) => void, filterName: keyof Filters) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked ? true : undefined;
      setter(checked);
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: checked,
      }));
    };

  const handleBusynessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setBusyness((prevBusyness) => (prevBusyness === value ? undefined : value)); // Toggle the checkbox
    setFilters((prevFilters) => ({
      ...prevFilters,
      busyness: busyness === value ? undefined : value,
    }));
  };

  const handleApply = () => {
    onApply();
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
            <Form.Group>
              <Form.Label className="form-label">Amenities</Form.Label>
              <Form.Check
                id="toiletSelect"
                type="checkbox"
                label="Toilet"
                checked={isToilet === true}
                onChange={handleCheckboxChange(setIsToilet, "isToilet")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="accessibleToiletSelect"
                type="checkbox"
                label="Accessible Toilet"
                checked={isToiletHandicapAccess === true}
                onChange={handleCheckboxChange(
                  setIsToiletHandicapAccess,
                  "isToiletHandicapAccess"
                )}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="playgroundSelect"
                type="checkbox"
                label="Playground"
                checked={isPlayground === true}
                onChange={handleCheckboxChange(setIsPlayground, "isPlayground")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="benchSelect"
                type="checkbox"
                label="Benches"
                checked={isBench === true}
                onChange={handleCheckboxChange(setIsBench, "isBench")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="shelterSelect"
                type="checkbox"
                label="Shelter"
                checked={isShelter === true}
                onChange={handleCheckboxChange(setIsShelter, "isShelter")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="drinkingWaterSelect"
                type="checkbox"
                label="Water Fountain"
                checked={isDrinkingWater === true}
                onChange={handleCheckboxChange(
                  setIsDrinkingWater,
                  "isDrinkingWater"
                )}
                style={{ borderRadius: "20px" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className="form-label">Food & Drink</Form.Label>
              <Form.Check
                id="cafeSelect"
                type="checkbox"
                label="Cafe"
                checked={isCafe === true}
                onChange={handleCheckboxChange(setIsCafe, "isCafe")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="restaurantSelect"
                type="checkbox"
                label="Restaurant"
                checked={isRestaurant === true}
                onChange={handleCheckboxChange(setIsRestaurant, "isRestaurant")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="barSelect"
                type="checkbox"
                label="Bar"
                checked={isBar === true}
                onChange={handleCheckboxChange(setIsBar, "isBar")}
                style={{ borderRadius: "20px" }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label className="form-label">Features</Form.Label>
              <Form.Check
                id="gardenSelect"
                type="checkbox"
                label="Garden"
                checked={isGarden === true}
                checked={isGarden === true}
                onChange={handleCheckboxChange(setIsGarden, "isGarden")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="fountainSelect"
                type="checkbox"
                label="Decorative Fountain"
                checked={isFountain === true}
                checked={isFountain === true}
                onChange={handleCheckboxChange(setIsFountain, "isFountain")}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="monumentSelect"
                type="checkbox"
                label="Monument"
                checked={isMonument === true}
                onChange={handleCheckboxChange(setIsMonument, "isMonument")}
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
              Reset
            </Button>
            <Button
              variant="light"
              onClick={handleApply}
              style={{
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ResultFilters;
