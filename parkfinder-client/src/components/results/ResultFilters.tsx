import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./ResultFilters.css";

const ResultFilters = ({ onApply, onReset }) => {
  const [isToilet, setIsToilet] = useState<boolean | undefined>(undefined);
  const [isCoffeeShop, setIsCoffeeShop] = useState<boolean | undefined>(
    undefined
  );
  const [busyness, setBusyness] = useState<string>("");

  const handleApply = () => {
    onApply({ isToilet, isCoffeeShop, busyness });
  };

  const handleReset = () => {
    setIsToilet(undefined);
    setIsCoffeeShop(undefined);
    setBusyness("");
    onReset();
  };

  return (
    <div className="filter-container">
      <Form>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="busynessSelect">
              {/* <Form.Label>Filter by Busyness</Form.Label> */}
              <Form.Control
                as="select"
                value={busyness}
                onChange={(e) => setBusyness(e.target.value)}
                style={{ borderRadius: "20px" }}
              >
                <option value="">Busyness Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="toiletSelect">
              {/* <Form.Label>Filter by Toilets</Form.Label> */}
              <Form.Control
                as="select"
                value={isToilet !== undefined ? String(isToilet) : ""}
                onChange={(e) => setIsToilet(e.target.value === "true")}
                style={{ borderRadius: "20px" }}
              >
                <option value="">Toilets</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="coffeeShopSelect">
              {/* <Form.Label>Filter by Coffee Shop</Form.Label> */}
              <Form.Control
                as="select"
                value={isCoffeeShop !== undefined ? String(isCoffeeShop) : ""}
                onChange={(e) => setIsCoffeeShop(e.target.value === "true")}
                style={{ borderRadius: "20px" }}
              >
                <option value="">Coffee Shop</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={handleApply}
              style={{
                marginRight: "1rem",
                marginTop: "0.5rem",
                borderRadius: "20px",
              }}
            >
              APPLY
            </Button>
            <Button
              variant="secondary"
              onClick={handleReset}
              style={{ borderRadius: "20px" }}
            >
              RESET
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
//   return (
//     <div className="filters-container">
//       <div className="filter-item">
//         <select
//           className="filter-drop"
//           value={isToilet !== undefined ? String(isToilet) : ""}
//           onChange={(e) => setIsToilet(e.target.value === "true")}
//         >
//           <option value="" disabled>
//             Toilets
//           </option>
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>
//       </div>
//       <div className="filter-item">
//         <select
//           className="filter-drop"
//           value={isCoffeeShop !== undefined ? String(isCoffeeShop) : ""}
//           onChange={(e) => setIsCoffeeShop(e.target.value === "true")}
//         >
//           <option value="" disabled>
//             Coffee Shops
//           </option>
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>
//       </div>
//       <div className="filter-item">
//         <select
//           className="filter-drop"
//           value={busyness}
//           onChange={(e) => setBusyness(e.target.value)}
//         >
//           <option value="" disabled>
//             Busyness
//           </option>
//           <option value="low">Low</option>
//           <option value="medium">Medium</option>
//           <option value="high">High</option>
//         </select>
//       </div>
//       <div className="filter-buttons">
//         <button onClick={handleApply}>APPLY</button>
//         <button onClick={handleReset}>RESET</button>
//       </div>
//     </div>
//   );
// };

export default ResultFilters;
