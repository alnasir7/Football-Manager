import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  laLigaTeams,
  premierLeagueTeams,
  championsLeagueTeams,
} from "../Data/teams";
import laLigaIcon from "../Data/Logos/Competitions/laLiga.png";
import premierLeagueIcon from "../Data/Logos/Competitions/premierLeague.png";
import superLeagueIcon from "../Data/Logos/Competitions/superLeague.png";

const Select = ({ history }) => {
  const dispatch = useDispatch();
  const [laLiga, changelaLiga] = useState(false);
  const [premierLeague, changepremierLeague] = useState(false);
  const [superLeague, changesuperLeague] = useState(false);

  const select = (league) => {
    if (league === "premierLeague") {
      changepremierLeague(!premierLeague);
      if (!premierLeague && laLiga) changelaLiga(false);
      if (!premierLeague && superLeague) changesuperLeague(!superLeague);
    }
    if (league === "laLiga") {
      changelaLiga(!laLiga);
      if (!laLiga && premierLeague) changepremierLeague(!premierLeague);
      if (!laLiga && superLeague) changesuperLeague(!superLeague);
    }
    if (league === "superLeague") {
      changesuperLeague(!superLeague);
      if (!superLeague && premierLeague) changepremierLeague(!premierLeague);
      if (!superLeague && laLiga) changelaLiga(false);
    }
  };

  const advance = () => {
    if (premierLeague) {
      dispatch({ type: "uploadTeams", payload: premierLeagueTeams });
      const ids = premierLeagueTeams.map((team) => team.id);
      dispatch({ type: "uploadIds", payload: ids });
    }
    if (laLiga) {
      dispatch({ type: "uploadTeams", payload: laLigaTeams });
      const ids = laLigaTeams.map((team) => team.id);
      dispatch({ type: "uploadIds", payload: ids });
    }
    if (superLeague) {
      dispatch({ type: "uploadTeams", payload: championsLeagueTeams });
      const ids = championsLeagueTeams.map((team) => team.id);
      dispatch({ type: "uploadIds", payload: ids });
    }

    history.push("/home");
  };
  return (
    <div className="container select-container">
      <h1 style={{ marginBottom: "100px" }}>Select A League</h1>
      <div className="leagues">
        <ul className="list-group">
          <li
            onClick={() => select("laLiga")}
            className={laLiga ? "list-group-item active" : "list-group-item"}
          >
            <img src={laLigaIcon} alt="La Liga" />
            <span className="ml-4">La Liga</span>
          </li>
          <li
            onClick={() => select("premierLeague")}
            className={
              premierLeague ? "list-group-item active" : "list-group-item"
            }
          >
            {" "}
            <img src={premierLeagueIcon} alt="Premier League" />
            <span className="ml-4">Premier League</span>
          </li>
          <li
            onClick={() => select("superLeague")}
            className={
              superLeague ? "list-group-item active" : "list-group-item"
            }
          >
            {" "}
            <img src={superLeagueIcon} alt="Super League" />
            <span className="ml-4">Super League</span>
          </li>
        </ul>
        <div className="mt-5 container advance">
          <div className="flexItem">
            <button onClick={advance} className=" btn btn-primary">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Select;
