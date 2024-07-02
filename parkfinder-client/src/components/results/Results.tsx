import { useLocation } from "react-router-dom";
import ResultCard from "./ResultCard"; // Adjust the import based on your file structure

const Results = () => {
  const location = useLocation();
  const parksResult = location.state?.parks || [];

  return (
    <div>
      <h1>Park Search Results</h1>
      <ul>
        {parksResult.map((parkResult: any, index: number) => (
          <ResultCard
            key={index}
            parkName={parkResult.park.parkName}
            distance={parkResult.distance}
            busyness={parkResult.busyness}
            isCoffeeShop={parkResult.park.isCoffeeShop}
            isToilet={parkResult.park.isToilet}
          />
        ))}
      </ul>
    </div>
  );
};

export default Results;
