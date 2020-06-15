import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Match from "./Match";
import Table from "./table";
import Navbar from "./Navbar";
const Fixtures = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((store) => store.scheduleReducer.schedule);
  const round = useSelector((store) => store.scheduleReducer.round);
  const [matchPlayed, changeMatchPayed] = useState(false);

  const proceed = () => {
    if (matchPlayed) {
      dispatch({ type: "changeRound", payload: round + 1 });
      changeMatchPayed(false);
    } else changeMatchPayed(true);
  };

  return (
    <div style={{ textAlign: "center", background: "#f1f1f1" }}>
      <div style={{ textAlign: "center", margin: "3%" }}>
        <h4>Round {round + 1}</h4>
      </div>
      <div style={{ margin: "0px 25%", paddingTop: "5%" }}>
        {schedule[round].map((element) => (
          <div>
            <Match
              homeTeam={element[0]}
              awayTeam={element[1]}
              matchPlayed={matchPlayed}
            />
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary"
        onClick={proceed}
        style={{
          marginTop: "8px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "40px",
        }}
      >
        Procced
      </button>
    </div>
  );
};

export default Fixtures;
