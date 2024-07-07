import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ParkModal from "../parkmodal/ParkModal";

interface ResultCardProps {
  parkName: string;
  distance: string;
  busyness: number;
  entrances: string;
  isCoffeeShop: number;
  isToilet: number;
  parkEntrance: string;
}

function ResultCard({
  parkName,
  distance,
  busyness,
  //   entrances,
  isCoffeeShop,
  isToilet,
}: //   parkEntrance,

ResultCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // const park = {
  //   parkName,
  //   distance,
  //   busyness,
  //   // entrances (returns an array of lat-long)
  //   isCoffeeShop,
  //   isToilet,
  //   // parkEntrance,
  // };

  function formatYesNo(value: number): string {
    return value === 1 ? "Yes" : "No";
  }

  function busynessScore(value: number): string {
    if (value >= 66) {
      return "High";
    } else if (value >= 33) {
      return "Medium";
    } else {
      return "Low";
    }
  }

  return (
    <>
      <Card style={{ minWidth: "200px" }}>
        {/* <Card.Img variant="left" src={park.image} alt={park.name} /> */}
        <Card.Body>
          <Card.Title>{parkName}</Card.Title>
          <p className="card-text">
            Distance: {distance} <br />
            Busyness: {busynessScore(busyness)}
            <br />
            Coffee Shop: {formatYesNo(isCoffeeShop)}
            <br />
            Toilets: {formatYesNo(isToilet)}
            <br />
            {/* Park Entrance: {parkEntrance} */}
          </p>
          <Button onClick={handleShow}>View Details</Button>
        </Card.Body>
      </Card>
      <ParkModal
        show={showModal}
        handleClose={handleClose}
        parkName={parkName}
        distance={distance}
        busyness={busyness}
        isCoffeeShop={isCoffeeShop}
        isToilet={isToilet}
        activities={[]}
      />
    </>
  );
}

export default ResultCard;
