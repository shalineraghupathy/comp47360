import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import MockModal from "./MockModal";
import "./ParkCard.css";
interface ParkCardProps {
  parkName: string;
  image: string;
  hasToilet: number;
  hasCafe: number;
  hasPlayground: number;
  hasToiletHandicapAccess: number;
  hasRestaurant: number;
  hasShelter: number;
  hasDrinkingWater: number;
  hasBar: number;
  hasBench: number;
  hasGarden: number;
  hasFountain: number;
  hasMonument: number;
}

function ParkCard({
  parkName,
  image,
  hasCafe,
  hasToilet,
  hasPlayground,
  hasToiletHandicapAccess,
  hasRestaurant,
  hasShelter,
  hasDrinkingWater,
  hasBar,
  hasBench,
  hasGarden,
  hasFountain,
  hasMonument,
}: ParkCardProps) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card
        className="park-card"
        style={{ minWidth: "200px", borderRadius: "20px" }}
      >
        <Card.Img
          variant="top"
          src={image}
          alt={parkName}
          style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}
        />
        <Card.Body>
          <h5
            style={{
              padding: "0.5rem 0rem 0.5rem 0.75rem",
              fontSize: "1.25rem",
              fontWeight: "550",
              color: "dimgray",
              borderBottom: "1px inset whitesmoke",
            }}
          >
            {parkName}
          </h5>
          <Button
            variant="link"
            onClick={handleShow}
            style={{
              float: "right",
              borderRadius: "20px",
              padding: "0.3rem 1rem",
              color: "grey",
              textDecoration: "none",
              border: "1px solid lightgrey",
              margin: "0rem 0.5rem 0.5rem 0rem",
            }}
          >
            Details
          </Button>
        </Card.Body>
      </Card>
      <MockModal
        show={showModal}
        handleClose={handleClose}
        parkName={parkName}
        hasCafe={hasCafe}
        hasToilet={hasToilet}
        hasPlayground={hasPlayground}
        hasToiletHandicapAccess={hasToiletHandicapAccess}
        hasRestaurant={hasRestaurant}
        hasShelter={hasShelter}
        hasDrinkingWater={hasDrinkingWater}
        hasBar={hasBar}
        hasBench={hasBench}
        hasGarden={hasGarden}
        hasFountain={hasFountain}
        hasMonument={hasMonument}
      />
    </>
  );
}

export default ParkCard;
