import { Park } from "../../services/parks";
import { Container, Row, Col, Button } from "react-bootstrap";
import FavouritesCard from "../signup/FavouritesCard";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { DATA_URL } from "../../constants";

function FavouritesPage() {
  // const location = useLocation();
  const userFirstName = localStorage.getItem("userFirstName");
  // const { parks } = location.state || { parks: [] };
  const [parks, setFavouriteParks] = useState<Park[]>([]);
  const navigate = useNavigate();
  console.log(parks);

  useEffect(() => {
    const fetchFavouriteParks = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(`${DATA_URL}/parks/listAllFavorites`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch favourite parks");
        }

        const parks: Park[] = await response.json();
        setFavouriteParks(parks);
        console.log("hi");
      } catch (error) {
        console.error("Error fetching favourite parks:", error);
      }
    };

    fetchFavouriteParks();
  }, []);

  const handleViewClick = () => {
    navigate("/profile");
  };
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
                  {/* <a
                    href="/profile"
                    style={{ textDecoration: "none", color: "seagreen" }}
                  >
                    <i
                      className="fa fa-arrow-left"
                      aria-hidden="true"
                      style={{ paddingRight: "0.5rem" }}
                    ></i>
                    Return to profile
                  </a> */}
                  <Button
                    className="button"
                    style={{
                      paddingLeft: "0",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                    }}
                    variant="link"
                    onClick={handleViewClick}
                  >
                    Return to Profile{" "}
                    <i
                      className="fa fa-arrow-right"
                      style={{ paddingLeft: "0.3rem", marginTop: "1rem" }}
                      aria-hidden="true"
                    ></i>
                  </Button>
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
