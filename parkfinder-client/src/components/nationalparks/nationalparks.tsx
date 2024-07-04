import React, { useState } from "react";
import Header from "./header/Header";
import Filters from "./filters/Filters";
import ParksList from "./parklist/ParkList";
import "./nationalparks.css";

interface FilterState {
  activity?: string;
  zipCode?: string;
  parkName?: string;
}

const NationalParks: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({});
  const [activities, setActivities] = useState<string[]>([]);

  const handleApply = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  return (
    <div className="national-parks">
      <Header />
      <Filters
        onApply={handleApply}
        onReset={handleReset}
        activities={activities}
      />
      <ParksList filters={filters} setActivities={setActivities} />
    </div>
  );
};

export default NationalParks;
