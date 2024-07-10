import { useState } from "react";
import {
  Card,
  Col,
  Row,
  ProgressBar,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import ParkModal from "../parkmodal/ParkModal";
import amenityIcons from "../parkmodal/AmenityIcon";
import "./ResultCard.css";

interface ResultCardProps {
  parkName: string;
  distance: number;
  busyness: number;
  isCoffeeShop: number;
  isToilet: number;
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

  const getVariant = (busyness: number) => {
    if (busyness <= 33) return "success";
    if (busyness <= 66) return "warning";
    return "danger";
  };
  const getLabel = (busyness: number) => {
    if (busyness <= 33) return "Low Busyness";
    if (busyness <= 66) return "Medium Busyness";
    return "High Busyness";
  };

  // function formatYesNo(value: number): string {
  //   return value === 1 ? "Yes" : "No";
  // }

  // function busynessScore(value: number): string {
  //   if (value >= 66) {
  //     return "High";
  //   } else if (value >= 33) {
  //     return "Medium";
  //   } else {
  //     return "Low";
  //   }
  // }

  function resolveDistance(distance: number): string {
    return `${distance.toFixed(2)} km`;
  }

  const amenities = [
    { name: "Toilets", value: isToilet },
    { name: "Cafe", value: isCoffeeShop },
  ];

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
              <div className="card-content">
                <table className="card-text">
                  <tr>
                    <td>
                      <i
                        className="fa fa-map-marker"
                        aria-hidden="true"
                        style={{ marginRight: "0.5rem" }}
                      ></i>
                      {resolveDistance(distance)}
                    </td>
                    <td> from selected location</td>
                  </tr>
                </table>
                <div className="amenities-container">
                  {amenities.map(
                    (amenity) =>
                      amenity.value === 1 && (
                        <OverlayTrigger
                          key={amenity.name}
                          placement="top"
                          overlay={<Tooltip>{amenity.name}</Tooltip>}
                        >
                          <div key={amenity.name} className="amenity-item">
                            <img
                              src={
                                amenityIcons[amenity.name] ||
                                amenityIcons.default
                              }
                              alt={amenity.name}
                              className="amenity-icon"
                            />
                            {/* {amenity.name} */}
                          </div>
                        </OverlayTrigger>
                      )
                  )}
                </div>
                <div className="card-busyness-bar">
                  <ProgressBar
                    now={busyness}
                    variant={getVariant(busyness)}
                    style={{ width: "60%" }}
                  />
                  <p className="busyness-label">{getLabel(busyness)}</p>
                </div>
                <button className="bottom-right-button" onClick={handleShow}>
                  Details
                </button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ParkModal
        show={showModal}
        handleClose={handleClose}
        parkName={parkName}
        distance={distance.toString()}
        busyness={busyness}
        isCoffeeShop={isCoffeeShop}
        isToilet={isToilet}
      />
    </>
  );
}

export default ResultCard;
