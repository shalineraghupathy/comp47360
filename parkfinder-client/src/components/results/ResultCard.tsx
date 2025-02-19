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
import parkImages from "./ParkImages";
import "./ResultCard.css";

interface ResultCardProps {
  parkName: string;
  parkID: string;
  distance: number;
  busyness: number;
  isCafe: number;
  isToilet: number;
  isToiletHandicapAccess: number;
  isPlayground: number;
  isRestaurant: number;
  isShelter: number;
  isDrinkingWater: number;
  isBar: number;
  isBench: number;
  isGarden: number;
  isFountain: number;
  isMonument: number;
  isFavourite: boolean;
}

function ResultCard({
  parkName,
  parkID,
  distance,
  busyness,
  isCafe,
  isToilet,
  isPlayground,
  isToiletHandicapAccess,
  isRestaurant,
  isShelter,
  isDrinkingWater,
  isBar,
  isBench,
  isGarden,
  isFountain,
  isMonument,
  isFavourite,
}: ResultCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    // Log all values being passed to the modal
    console.log({
      parkName,
      parkID,
      distance,
      busyness,
      isCafe,
      isToilet,
      isPlayground,
      isToiletHandicapAccess,
      isRestaurant,
      isShelter,
      isDrinkingWater,
      isBar,
      isBench,
      isGarden,
      isFountain,
      isMonument,
      isFavourite,
    });

    setShowModal(true);
  };
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

  function resolveDistance(distance: number): string {
    return `${distance.toFixed(2)} km`;
  }

  const amenities = [
    { name: "Toilet", value: isToilet },
    { name: "Accessible Toilet", value: isToiletHandicapAccess },
    { name: "Playground", value: isPlayground },
    { name: "Benches", value: isBench },
    { name: "Shelter", value: isShelter },
    { name: "Drinking Fountain", value: isDrinkingWater },
    { name: "Cafe", value: isCafe },
    { name: "Restaurant", value: isRestaurant },
    { name: "Bar", value: isBar },
    { name: "Garden", value: isGarden },
    { name: "Fountain", value: isFountain },
    { name: "Monument", value: isMonument },
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
                src={parkImages[parkName] || "./staticparkimages/default.jpg"}
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
        parkId={parkID}
        distance={distance}
        busyness={busyness}
        isCafe={isCafe}
        isToilet={isToilet}
        isPlayground={isPlayground}
        isToiletHandicapAccess={isToiletHandicapAccess}
        isRestaurant={isRestaurant}
        isShelter={isShelter}
        isDrinkingWater={isDrinkingWater}
        isBar={isBar}
        isBench={isBench}
        isGarden={isGarden}
        isFountain={isFountain}
        isMonument={isMonument}
        isFavourite={isFavourite}
      />
    </>
  );
}

export default ResultCard;
