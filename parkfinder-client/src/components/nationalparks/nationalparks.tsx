// src/components/NationalParks.tsx
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

  const handleApply = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleReset = () => {
    setFilters({});
  };

  return (
    <div className="national-parks">
      <Header />
      <Filters onApply={handleApply} onReset={handleReset} />
      <ParksList filters={filters} />
    </div>
  );
};

export default NationalParks;
