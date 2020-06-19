import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import teams from "../Data/teams";
import match from "../Engine/Match";
import { result } from "lodash";
import { type } from "jquery";

const Match = ({ teams, scores, round, index, played }) => {
  const homeTeam = teams[0];
  const awayTeam = teams[1];
  const dispatch = useDispatch();
  const home = useSelector((store) => store.statsReducer).filter(
    (team) => team.id === homeTeam
  )[0];
  const away = useSelector((store) => store.statsReducer).filter(
    (team) => team.id === awayTeam
  )[0];
  const schedule = useSelector((store) => store.scheduleReducer.schedule);
  console.log(played);

  const [result, changeResult] = useState(null);

  useEffect(() => {
    if (played) {
      const response = match(home, away);
      console.log("but why");
      matchCalculations(response);
      changeResult(response);
    } else {
      changeResult(null);
    }
  }, [played]);

  const matchCalculations = ({ homeScore, awayScore }) => {
    const newSchedue = [...schedule];
    newSchedue[round][index].result = { homeScore, awayScore };
    dispatch({ type: "updateSchedule", payload: newSchedue });

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

    var newHomeGoalsFor = 0;
    var newAwayGoalsFor = 0;
    var newHomeGoalsAgainst = 0;
    var newAwayGoalsAgainst = 0;
    if (home.goalsFor) newHomeGoalsFor = home.goalsFor + homeScore;
    else newHomeGoalsFor = homeScore;

    if (home.goalsAgainst) newHomeGoalsAgainst = home.goalsAgainst + awayScore;
    else newHomeGoalsAgainst = awayScore;

    if (away.goalsFor) newAwayGoalsFor = away.goalsFor + awayScore;
    else newAwayGoalsFor = awayScore;

    if (away.goalsAgainst) newAwayGoalsAgainst = away.goalsAgainst + homeScore;
    else newAwayGoalsAgainst = homeScore;

    dispatch({
      type: "updateTeam",
      payload: { id: homeTeam, prop: "points", propData: newHomePoints },
    });
    dispatch({
      type: "updateTeam",
      payload: { id: awayTeam, prop: "points", propData: newAwayPoints },
    });
    dispatch({
      type: "updateTeam",
      payload: { id: homeTeam, prop: "goalsFor", propData: newHomeGoalsFor },
    });
    dispatch({
      type: "updateTeam",
      payload: {
        id: homeTeam,
        prop: "goalsAgainst",
        propData: newHomeGoalsAgainst,
      },
    });
    dispatch({
      type: "updateTeam",
      payload: { id: awayTeam, prop: "goalsFor", propData: newAwayGoalsFor },
    });
    dispatch({
      type: "updateTeam",
      payload: {
        id: awayTeam,
        prop: "goalsAgainst",
        propData: newAwayGoalsAgainst,
      },
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
