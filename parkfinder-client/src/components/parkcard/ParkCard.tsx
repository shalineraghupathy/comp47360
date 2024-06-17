import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import ParkModal from "../parkmodal/ParkModal.tsx";
interface ParkCardProps {
  name: string;
  image: string;
  link: string;
}

function ParkCard({ name, image, link }: ParkCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const park = { name, image, link };

  return (
    <>
      <Card style={{ minWidth: "200px" }}>
        <Card.Img variant="top" src={image} alt={name} />
        <Card.Body>
          <Card.Title>{park.name}</Card.Title>
          <Button variant="link" onClick={handleShow}>
            {park.link}
          </Button>
        </Card.Body>
      </Card>
      <ParkModal show={showModal} handleClose={handleClose} park={park} />
    </>
  );
}

export default ParkCard;
