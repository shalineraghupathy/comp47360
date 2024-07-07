import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ParkModal from "../parkmodal/ParkModal";

interface ParkCardProps {
  name: string;
  image: string;
  link: string;
  distance: string;
  busyness: number;
  isCoffeeShop: number;
  isToilet: number;
  activities: { id: string; name: string }[];
}

function ParkCard({
  name,
  image,
  link,
  distance,
  busyness,
  isCoffeeShop,
  isToilet,
  activities,
}: ParkCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ minWidth: "200px" }}>
        <Card.Img variant="top" src={image} alt={name} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Button variant="link" onClick={handleShow}>
            {link}
          </Button>
        </Card.Body>
      </Card>
      <ParkModal
        show={showModal}
        handleClose={handleClose}
        parkName={name}
        distance={distance}
        busyness={busyness}
        isCoffeeShop={isCoffeeShop}
        isToilet={isToilet}
        activities={activities}
      />
    </>
  );
}

export default ParkCard;
