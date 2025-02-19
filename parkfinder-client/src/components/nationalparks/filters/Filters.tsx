import React, { useState } from "react";
import "./Filters.css";

interface FiltersProps {
  onApply: (filters: {
    activity?: string;
    zipCode?: string;
    parkName?: string;
  }) => void;
  onReset: () => void;
  activities: string[];
}

const Filters: React.FC<FiltersProps> = ({ onApply, onReset, activities }) => {
  const [activity, setActivity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [parkName, setParkName] = useState("");

  const handleApply = () => {
    onApply({ activity, zipCode, parkName });
  };

  const handleReset = () => {
    setActivity("");
    setZipCode("");
    setParkName("");
    onReset();
  };

  return (
    <div className="filterscontainer">
      <div className="filteritem">
        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option value="">Filter by Activity...</option>
          {activities.map((activity, index) => (
            <option key={index} value={activity}>
              {activity}
            </option>
          ))}
        </select>
      </div>
      <div className="filteritem">
        <input
          type="text"
          placeholder="Filter by Zip Code..."
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </div>
      <div className="filteritem">
        <input
          type="text"
          placeholder="Filter by Park Name..."
          value={parkName}
          onChange={(e) => setParkName(e.target.value)}
        />
      </div>
      <div className="filterbuttons">
        <button onClick={handleApply}>APPLY</button>
        <button onClick={handleReset}>RESET</button>
      </div>
    </div>
  );
};

export default Filters;
