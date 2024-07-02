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
          <Card.Title>{park.fullName}</Card.Title>
          <Card.Text>{park.description}</Card.Text>
          <Button variant="link" onClick={handleShow}>
            View Details
          </Button>
        </Card.Body>
      </Card>
      <ParkModal show={showModal} handleClose={handleClose} park={park} />
    </>
  );
};

export default ParkCard;
