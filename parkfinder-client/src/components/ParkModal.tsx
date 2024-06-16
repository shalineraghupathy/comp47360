import { Modal, Button } from "react-bootstrap";
import _default from "react-bootstrap/esm/Accordion";

interface ParkModalProps {
  show: boolean;
  handleClose: () => void;
  park: { name: string; image: string };
}

function ParkModal({ show, handleClose, park }: ParkModalProps) {
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{park.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Park Information To Be Populated</p>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ParkModal;
