import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import MockModal from "./MockModal";
interface ParkCardProps {
  parkName: string;
  image: string;
  isCoffeeShop: number;
  isToilet: number;
}

function ParkCard({ parkName, image, isCoffeeShop, isToilet }: ParkCardProps) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card style={{ minWidth: "200px", borderRadius: "20px" }}>
        <Card.Img
          variant="top"
          src={image}
          alt={parkName}
          style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }}
        />
        <Card.Body>
          <h5 style={{ paddingBottom: "0.75rem" }}>{parkName}</h5>
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
        isCoffeeShop={isCoffeeShop}
        isToilet={isToilet}
      />
    </>
  );
}

export default ParkCard;
