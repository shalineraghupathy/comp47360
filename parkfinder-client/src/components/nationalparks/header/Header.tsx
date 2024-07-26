// src/components/Header.tsx
import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>National Park Finder</h1>
      <p>
        Good news — you can search for national parks and monuments in Manhattan and the surrounding areas of New York State.
        <br />
        <br />
        Use the search filters below to begin your next adventure!
      </p>
    </header>
  );
};

export default Header;
