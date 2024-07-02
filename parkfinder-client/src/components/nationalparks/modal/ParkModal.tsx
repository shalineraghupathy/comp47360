import React from "react";
import { Modal, Button } from "react-bootstrap";

interface Park {
  id: string;
  fullName: string;
  description: string;
  url: string;
  images: { url: string }[];
}

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  park: Park;
}

const ParkModal: React.FC<ParkModalProps> = ({ show, handleClose, park }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{park.fullName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={park.images[0]?.url}
          alt={park.fullName}
          style={{ width: "100%", marginBottom: "15px" }}
        />
        <p>{park.description}</p>
        <a href={park.url} target="_blank" rel="noopener noreferrer">
          More Info
        </a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParkModal;
