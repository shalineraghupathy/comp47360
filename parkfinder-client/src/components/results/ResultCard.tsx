import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ParkModal from "../parkmodal/ParkModal";
import "./ResultCard.css";

interface ResultCardProps {
  parkName: string;
  distance: number;
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

  function resolveDistance(distance: number): string {
    return `${distance.toFixed(2)} km`;
  }

  return (
    <>
      <Card
        className="result-card"
        style={{ minWidth: "200px", borderRadius: "20px", cursor: "pointer" }}
        onClick={handleShow}
      >
        <Card.Body className="p-0">
          <Row>
            <Col xs={4}>
              <Card.Img
                className="card-img-left"
                src="./1.jpg"
                alt={parkName}
              />
            </Col>
            <Col xs={8} className="card-col">
              <Card.Title className="card-title">{parkName}</Card.Title>
              <p className="card-text">
                Distance: {resolveDistance(distance)} <br />
                Busyness: {busynessScore(busyness)}
                <br />
                Coffee Shop: {formatYesNo(isCoffeeShop)}
                <br />
                Toilets: {formatYesNo(isToilet)}
                <br />
              </p>
            </Col>
          </Row>
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
