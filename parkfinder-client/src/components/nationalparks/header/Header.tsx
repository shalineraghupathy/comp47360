// src/components/Header.tsx
import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Park Finder</h1>
      <p>
        Good news — you're one step closer to Finding Your Park. Whether you're
        looking for a specific activity or trying to locate a park near you, use
        the filters below to narrow your search and begin your next adventure.
      </p>
    </header>
  );
};

export default Header;
