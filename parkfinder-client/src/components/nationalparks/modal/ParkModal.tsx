import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./ParkModal.css";
import activityIcons from "./ActivityIcon"; // Import the activity-to-SVG mapping

interface Park {
  id: string;
  fullName: string;
  description: string;
  url: string;
  images: { url: string }[];
  activities: { id: string; name: string }[];
}

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  park: Park;
}

const ParkModal: React.FC<ParkModalProps> = ({ show, handleClose, park }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="parkmodal"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{park.fullName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="parkmodal-body">
          <img
            src={park.images[0]?.url}
            alt={park.fullName}
            className="parkmodalimage"
          />
          <div className="parkmodalcontent">
            <div className="parkmodalinfo">
              <p>{park.description}</p>
              <a href={park.url} target="_blank" rel="noopener noreferrer">
                More Info
              </a>
            </div>
            <div className="parkmodalactivities">
              <h5>Activities</h5>
              <div className="activitiesgrid">
                {park.activities.map((activity) => (
                  <div key={activity.id} className="activityitem">
                    <img
                      src={
                        activityIcons[activity.name] || activityIcons.default
                      }
                      alt={activity.name}
                      className="activityicon"
                    />
                    {activity.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
