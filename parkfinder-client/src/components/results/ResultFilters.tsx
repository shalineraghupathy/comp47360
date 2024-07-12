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

  useEffect(() => {
    onApply();
  }, [
    isToilet,
    isCafe,
    isToiletHandicapAccess,
    isPlayground,
    isRestaurant,
    isShelter,
    isDrinkingWater,
    isBar,
    isBench,
    isGarden,
    isFountain,
    isMonument,
    busyness,
    filters,
  ]);

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
    (setter: (value: boolean | undefined) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked ? true : undefined;
      setter(checked);
      if (event.target.id == "toiletSelect") {
        filters.isToilet = checked;
      }
      if (event.target.id == "cafeSelect") {
        filters.isCafe = checked;
      }
      if (event.target.id == "accessibleToiletSelect") {
        filters.isToiletHandicapAccess = checked;
      }
      if (event.target.id == "playgroundSelect") {
        filters.isPlayground = checked;
      }
      if (event.target.id == "restaurantSelect") {
        filters.isRestaurant = checked;
      }
      if (event.target.id == "shelterSelect") {
        filters.isShelter = checked;
      }
      if (event.target.id == "drinkingWaterSelect") {
        filters.isDrinkingWater = checked;
      }
      if (event.target.id == "barSelect") {
        filters.isBar = checked;
      }
      if (event.target.id == "benchSelect") {
        filters.isBench = checked;
      }
      if (event.target.id == "gardenSelect") {
        console.log("isGarden", filters.isGarden);
        filters.isGarden = checked;
      }
      if (event.target.id == "fountainSelect") {
        filters.isFountain = checked;
      }
      if (event.target.id == "monumentSelect") {
        filters.isMonument = checked;
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
            <Form.Group>
              <Form.Label className="form-label">Amenities</Form.Label>
              <Form.Check
                id="toiletSelect"
                type="checkbox"
                label="Toilet"
                checked={isToilet === true}
                onChange={handleCheckboxChange(setIsToilet)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="accessibleToiletSelect"
                type="checkbox"
                label="Accessible Toilet"
                checked={isToiletHandicapAccess === true}
                onChange={handleCheckboxChange(setIsToiletHandicapAccess)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="playgroundSelect"
                type="checkbox"
                label="Playground"
                checked={isPlayground === true}
                onChange={handleCheckboxChange(setIsPlayground)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="benchSelect"
                type="checkbox"
                label="Benches"
                checked={isBench === true}
                onChange={handleCheckboxChange(setIsBench)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="shelterSelect"
                type="checkbox"
                label="Shelter"
                checked={isShelter === true}
                onChange={handleCheckboxChange(setIsShelter)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="drinkingWaterSelect"
                type="checkbox"
                label="Water Fountain"
                checked={isDrinkingWater === true}
                onChange={handleCheckboxChange(setIsDrinkingWater)}
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
                label=" Cafe"
                checked={isCafe === true}
                onChange={handleCheckboxChange(setIsCafe)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="restaurantSelect"
                type="checkbox"
                label="Restaurant"
                checked={isRestaurant === true}
                onChange={handleCheckboxChange(setIsRestaurant)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="barSelect"
                type="checkbox"
                label="Bar"
                checked={isBar === true}
                onChange={handleCheckboxChange(setIsBar)}
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
                onChange={handleCheckboxChange(setIsBar)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="fountainSelect"
                type="checkbox"
                label="Decorative Fountain"
                onChange={handleCheckboxChange(setIsBar)}
                style={{ borderRadius: "20px" }}
              />
              <Form.Check
                id="monumentSelect"
                type="checkbox"
                label="Monument"
                checked={isMonument === true}
                onChange={handleCheckboxChange(setIsMonument)}
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
