/* eslint-disable @typescript-eslint/no-unused-vars */
// ProfileCard.tsx
import React from "react";
import { Card, Button, Image } from "react-bootstrap";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css"; // Add a CSS file for styling

const ProfileCard: React.FC = () => {
  const [userFirstName, setUserFirstName] = useLocalStorage("userFirstName");
  const [userEmail, setUserEmail] = useLocalStorage("userEmail");
  const [token, setToken] = useLocalStorage("token");
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/profile");
  };

  const handleViewFavourites = () => {
    navigate("/favourites");
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userFirstName");
    setToken(null);
    setUserFirstName(null);
    setUserEmail(null);
    navigate("/signin");
  };

  return (
    <Card className="profile-card" style={{ width: "18rem" }}>
      <Card.Body className="text-center">
        <Image
          src="/icon-profile.svg"
          roundedCircle
          className="profile-image"
        />
        <Card.Title className="profile-name">{userFirstName}</Card.Title>
        <Card.Text className="profile-role">{userEmail}</Card.Text>
        <Button
          variant="light"
          className="profile-button"
          onClick={handleViewProfile}
        >
          <i className="fa fa-edit" aria-hidden="true"></i> Profile
        </Button>
        <Button
          variant="light"
          className="profile-button"
          onClick={handleViewFavourites}
        >
          <i className="fa fa-heart-o" aria-hidden="true"></i> Favourites
        </Button>
        <Button
          variant="light"
          className="profile-button"
          onClick={handleSignOut}
        >
          <i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
