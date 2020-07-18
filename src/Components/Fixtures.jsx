import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Match from "./Match";

const Fixtures = (props) => {
  //return to home screen if the component was incorrectly accessed before initializing teams
  const initialTeams = useSelector((store) => store.statsReducer);
  if (!initialTeams.length) {
    props.history.push("./");
  }
  //
  const dispatch = useDispatch();
  const schedule = useSelector((store) => store.scheduleReducer.schedule);
  const round = useSelector((store) => store.scheduleReducer.round);
  const [matchPlayed, changeMatchPayed] = useState(false);

  const proceed = () => {
    if (schedule[round][0].result) {
      dispatch({ type: "changeRound", payload: round + 1 });
      changeMatchPayed(false);
    } else changeMatchPayed(true);
  };

  return (
    <div className="fixtures">
      <button
        className="btn btn-primary procced-button"
        disabled={round >= 37 && matchPlayed}
        onClick={proceed}
      >
        Procced
      </button>
      <div style={{ textAlign: "center", margin: "2%" }}>
        <h4>Round {round + 1}</h4>
      </div>
      <div className="fixtures-body">
        {schedule[round]
          ? schedule[round].map((element, index) => {
              return (
                <div>
                  <Match
                    match={element}
                    index={index}
                    round={round}
                    played={matchPlayed}
                  />
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Fixtures;
