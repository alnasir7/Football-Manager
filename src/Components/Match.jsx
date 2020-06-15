import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import teams from "../Data/teams";
import match from "../Engine/Match";
import { result } from "lodash";
import { type } from "jquery";

const Match = ({ homeTeam, awayTeam, matchPlayed }) => {
  const dispatch = useDispatch();
  const home = useSelector((store) => store.statsReducer)[homeTeam];
  const away = useSelector((store) => store.statsReducer)[awayTeam];

  const [result, changeResult] = useState(null);

  useEffect(() => {
    if (matchPlayed) {
      const response = match(home, away);
      matchCalculations(response);
      changeResult(response);
    } else {
      changeResult(null);
    }
  }, [matchPlayed]);

  const matchCalculations = ({ homeScore, awayScore }) => {
    var newHomePoints = 0;
    var newAwayPoints = 0;
    if (homeScore > awayScore) {
      if (home.points) newHomePoints = home.points + 3;
      else newHomePoints = 3;

      if (away.points) newAwayPoints = away.points;
      else newAwayPoints = 0;
    }

    if (homeScore === awayScore) {
      if (home.points) newHomePoints = home.points + 1;
      else newHomePoints = 1;

      if (away.points) newAwayPoints = away.points + 1;
      else newAwayPoints = 1;
    }
    if (awayScore > homeScore) {
      if (home.points) newHomePoints = home.points;
      else newHomePoints = 0;

      if (away.points) newAwayPoints = away.points + 3;
      else newAwayPoints = 3;
    }
    dispatch({
      type: "updateTeam",
      payload: { id: homeTeam, prop: "points", propData: newHomePoints },
    });
    dispatch({
      type: "updateTeam",
      payload: { id: awayTeam, prop: "points", propData: newAwayPoints },
    });
  };

  return (
    <div>
      <div
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="flexItem">
          <img src={home.logo} alt={home.name} />
        </div>
        {result ? (
          <div className="flexItem">
            {result.homeScore} : {result.awayScore}
          </div>
        ) : null}
        <div className="flexItem">
          <img src={away.logo} alt={away.name} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Match;
