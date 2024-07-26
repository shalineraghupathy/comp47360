import { useLocation } from "react-router-dom";
import { Park } from "../../services/parks";
import { Container, Row, Col } from "react-bootstrap";
import FavouritesCard from "../signup/FavouritesCard";

function FavouritesPage() {
  const location = useLocation();
  const userFirstName = localStorage.getItem("userFirstName");
  const { parks } = location.state || { parks: [] };
  console.log(parks);
  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <div className="mt-5">
            <div
              style={{
                marginLeft: "5rem",
                marginRight: "3rem",
                padding: "1rem",
                borderRadius: "20px",
                backgroundColor: "whitesmoke",
                border: "0",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <h4
                style={{
                  textAlign: "center",
                  marginTop: "1.5rem",
                  fontWeight: "550",
                }}
              >
                {userFirstName}'s Favourite Parks
              </h4>
              <p
                style={{
                  marginTop: "2rem",
                  marginBottom: "2rem",
                  fontWeight: "550",
                }}
              >
                <ul>
                  <i
                    className="fa fa-arrow-right"
                    aria-hidden="true"
                    style={{ paddingRight: "0.5rem" }}
                  ></i>
                  Check out your saved parks
                </ul>
                <ul>
                  <a
                    href="/profile"
                    style={{ textDecoration: "none", color: "seagreen" }}
                  >
                    <i
                      className="fa fa-arrow-left"
                      aria-hidden="true"
                      style={{ paddingRight: "0.5rem" }}
                    ></i>
                    Return to profile
                  </a>
                </ul>
              </p>
            </div>
          </div>
          {/* <Card
            style={{
              borderRadius: "20px",
              marginLeft: "5rem",
              marginRight: "3rem",
              marginTop: "2rem",
            }}
          >
            <img
              style={{ height: "8rem", objectFit: "cover" }}
              className="card-img-top"
              src="./staticparkimages/mapview.png"
              alt="Card image cap"
            />
            <a
              href="/parkmap"
              className="card-body"
              style={{
                textAlign: "center",
                textDecoration: "none",
                padding: "0.5rem",
              }}
            >
              View map
            </a>{" "}
          </Card> */}
        </Col>
        <Col md={8}>
          <div className="mt-5" style={{ marginRight: "4rem" }}>
            {parks.map((park: Park, index: number) => (
              <FavouritesCard
                id={index}
                parkName={park.parkName}
                isCafe={park.isCafe}
                isToilet={park.isToilet}
                isPlayground={park.isPlayground}
                isToiletHandicapAccess={park.isToiletHandicapAccess}
                isRestaurant={park.isRestaurant}
                isShelter={park.isShelter}
                isDrinkingWater={park.isDrinkingWater}
                isBar={park.isBar}
                isBench={park.isBench}
                isGarden={park.isGarden}
                isFountain={park.isFountain}
                isMonument={park.isMonument}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FavouritesPage;
