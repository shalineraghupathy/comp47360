import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Park } from "../../services/parks";
import "./ProfilePage.css";
import CustomFooter from "../home/CustomFooter";
import { DATA_URL } from "../../constants";

const ProfilePage: React.FC = () => {
  const [favouriteParks, setFavouriteParks] = useState<Park[]>([]);
  const userFirstName = localStorage.getItem("userFirstName");
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

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
  //     //fetch!
  //     const fetchFavouriteParks = async () => {
  //       // Mocked data
  //       const parks = [
  //         {
  //           id: 1,
  //           parkName: "Central Park",
  //           isToilet: 1,
  //           isCafe: 1,
  //           isPlayground: 1,
  //           isToiletHandicapAccess: 1,
  //           isRestaurant: 1,
  //           isShelter: 1,
  //           isDrinkingWater: 1,
  //           isBar: 1,
  //           isBench: 1,
  //           isGarden: 1,
  //           isFountain: 1,
  //           isMonument: 1,
  //         },
  //         {
  //           id: 2,
  //           parkName: "Bryant Park",
  //           isToilet: 1,
  //           isCafe: 1,
  //           isPlayground: 1,
  //           isToiletHandicapAccess: 1,
  //           isRestaurant: 1,
  //           isShelter: 1,
  //           isDrinkingWater: 1,
  //           isBar: 1,
  //           isBench: 1,
  //           isGarden: 1,
  //           isFountain: 1,
  //           isMonument: 1,
  //         },
  //         {
  //           id: 3,
  //           parkName: "The High Line",
  //           isToilet: 1,
  //           isCafe: 1,
  //           isPlayground: 1,
  //           isToiletHandicapAccess: 1,
  //           isRestaurant: 1,
  //           isShelter: 1,
  //           isDrinkingWater: 1,
  //           isBar: 1,
  //           isBench: 1,
  //           isGarden: 1,
  //           isFountain: 1,
  //           isMonument: 1,
  //         },
  //       ];
  //       setFavouriteParks(parks);
  //     };

  //     fetchFavouriteParks();
  //   }, []);

  if (!userFirstName || !userEmail) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const handleViewClick = () => {
    navigate("/favourites", { state: { parks: favouriteParks } });
  };

  return (
    <Container fluid>
      <Row>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Col md={4} xs={6}>
            <Card
              className="left-card"
              style={{
                height: "70vh",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "0",
                borderTopLeftRadius: "20px",
                borderBottomLeftRadius: "20px",
                border: "0",
              }}
            >
              <Card.Body>
                <h1 className="left-heading">Hi, {userFirstName}!</h1>
                <p className="left-text">
                  Welcome to your ParkFinder profile. <br /> View your account
                  details and check out your favourites. <br />
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} xs={6}>
            <Card
              className="right-card"
              style={{
                height: "70vh",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                paddingTop: "1rem",
              }}
            >
              <Card.Body>
                <h4 className="right-heading">Account Information</h4>
                <ListGroup className="details" variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span className="label">First Name</span>
                    <span className="content">{userFirstName}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span className="label">Email Address</span>
                    <span className="content">{userEmail}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span className="label">Member Since</span>
                    <span className="content">July 2024</span>
                  </ListGroup.Item>
                </ListGroup>
                <h4 className="right-heading">My Favourites</h4>
                <ListGroup className="details" variant="flush">
                  {favouriteParks
                    .slice(0, 2)
                    .map((park: Park, index: number) => (
                      <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between"
                      >
                        {park.parkName}
                        <span className="text-danger">
                          <i
                            className="fa fa-heart"
                            style={{ fontSize: "0.75rem" }}
                            aria-hidden="true"
                          ></i>
                        </span>
                      </ListGroup.Item>
                    ))}
                  <ListGroup.Item className="d-flex justify-content-between">
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
                      View All Favourites{" "}
                      <i
                        className="fa fa-arrow-right"
                        style={{ paddingLeft: "0.3rem", marginTop: "1rem" }}
                        aria-hidden="true"
                      ></i>
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </div>
      </Row>
      <CustomFooter />
    </Container>
  );
};

export default ProfilePage;
