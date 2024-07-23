import { useState } from "react";
import {
  Card,
  Col,
  Row,
  Tooltip,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import amenityIcons from "../parkmodal/AmenityIcon";
import { Park } from "../../services/parks";
import parkImages from "../results/ParkImages";
import MockModal from "../parkcard/MockModal";
import "../parkmodal/ParkModal.css";
import "../results/ResultCard.css";

function FavouritesCard({
  parkName,
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
}: Park) {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

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
        style={{ borderRadius: "20px", cursor: "pointer" }}
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
            <Col xs={5} className="card-col">
              <Card.Title
                className="card-title"
                style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
              >
                {parkName}
              </Card.Title>
              <div className="card-content">
                <div
                  className="amenities-container d-flex"
                  // style={{ flexWrap: "wrap", width: "100%" }}
                >
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
                          </div>
                        </OverlayTrigger>
                      )
                  )}
                </div>
              </div>
              <button
                className="bottom-right-button"
                onClick={handleShow}
                style={{ bottom: "1.5rem" }}
              >
                Details
              </button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <MockModal
        show={showModal}
        handleClose={handleClose}
        parkName={parkName}
        hasCafe={isCafe}
        hasToilet={isToilet}
        hasPlayground={isPlayground}
        hasToiletHandicapAccess={isToiletHandicapAccess}
        hasRestaurant={isRestaurant}
        hasShelter={isShelter}
        hasDrinkingWater={isDrinkingWater}
        hasBar={isBar}
        hasBench={isBench}
        hasGarden={isGarden}
        hasFountain={isFountain}
        hasMonument={isMonument}
      />
    </>
  );
}

export default FavouritesCard;
