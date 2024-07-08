import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ParkModal from "../modal/ParkModal";
import "./ParkCard.css";

export interface Park {
  id: string;
  fullName: string;
  description: string;
  url: string;
  images: { url: string }[];
  activities: { id: string; name: string }[]; // Add activities property
}

interface ParkCardProps {
  park: Park;
}

const ParkCard: React.FC<ParkCardProps> = ({ park }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card className="parkcard">
        <Card.Img variant="top" src={park.images[0]?.url} alt={park.fullName} />
        <Card.Body>
          <Card.Title className="parkcardtitle">{park.fullName}</Card.Title>
          <Card.Text className="description">{park.description}</Card.Text>
          <Button
            variant="link"
            className="parkcardbutton"
            onClick={handleShow}
          >
            View Details
          </Button>
        </Card.Body>
      </Card>
      <ParkModal show={showModal} handleClose={handleClose} park={park} />
    </>
  );
};

export default ParkCard;
