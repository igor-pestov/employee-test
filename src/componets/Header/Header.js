import React from "react";
import { Link } from "react-router-dom";
import "./headerStyle.css";

const Header = () => {
  return (
    <div className="main-header">
      <Link to="/">General summary</Link>
      <Link to="/employee-table">Employee table</Link>
    </div>
  );
};

export default Header;
