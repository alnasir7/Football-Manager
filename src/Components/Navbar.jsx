import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-dark bg-dark"
      style={{ width: "100vw", zIndex: "2", padding: "0px" }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "0px",
          padding: "10px",
          height: "80px",
          fontSize: "26px",
          minWidth: "100vw",
        }}
      >
        <div className="flexItem">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h3>Home</h3>
          </Link>
        </div>

        <div className="flexItem">
          <Link
            to="/Fixtures"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>Fixtures</h3>
          </Link>
        </div>

        <div className="flexItem">
          <Link to="/table" style={{ textDecoration: "none", color: "white" }}>
            <h3>Table</h3>
          </Link>
        </div>

        <div className="flexItem">
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            <h3>Top Scorers</h3>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
