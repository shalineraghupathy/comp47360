import { Card } from "react-bootstrap";

interface ParkCardProps {
  name: string;
  image: string;
  link: string;
}

function ParkCard({ name, image, link }: ParkCardProps) {
  return (
    <Card style={{ minWidth: "200px" }}>
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Link>{link}</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ParkCard;
