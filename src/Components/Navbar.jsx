import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const Navbar = () => {
  const teams = useSelector((store) => store.statsReducer);
  const teamsHaveBeenSelected = teams.length;

  return (
    <nav className="navbar navbar-dark bg-dark navbar-custom">
      <div
        className="container nav-container"
        style={{ display: teamsHaveBeenSelected ? "" : "none" }}
      >
        <div className="flexItem">
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <h3>Home</h3>
          </Link>
        </div>

        <div className="flexItem">
          <Link
            to="/Fixtures"
            style={{
              textDecoration: "none",
              color: "white",
            }}
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
          <Link
            to="/goalscorers"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>Top Scorers</h3>
          </Link>
        </div>
        <div className="flexItem">
          <h3
            style={{ color: "white", cursor: "pointer" }}
            onClick={() => {
              window.location = "/";
            }}
          >
            Restart
          </h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
