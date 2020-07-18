import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import matchGenerate from "../Engine/Match";
import calculateLeagueChanges from "../Engine/leagueCalculations";

const Match = ({ match, round, index, played }) => {
  const dispatch = useDispatch();
  //defining the constants of the mathc
  const ids = useSelector((store) => store.idReducer);
  const { teams, result: score, scorers } = match;
  const homeTeam = teams[0];
  const awayTeam = teams[1];
  const home = useSelector((store) => store.statsReducer).filter(
    (team) => team.id === ids[homeTeam]
  )[0];
  const away = useSelector((store) => store.statsReducer).filter(
    (team) => team.id === ids[awayTeam]
  )[0];
  const schedule = useSelector((store) => store.scheduleReducer.schedule);
  //setting max goals to know how many lines in the goal scoreres section
  var maxGoals;
  if (scorers)
    maxGoals =
      scorers.goalScorersHome.length >= scorers.goalScorersAway.length
        ? "home"
        : "away";

  //Setting the result
  const [result, changeResult] = useState();

  useEffect(() => {
    //determining the result of the match
    if (played) {
      const response = matchGenerate(home, away);
      matchCalculations(response);
      changeResult(response);
    } else {
      changeResult(
        score
          ? { homeScore: score.homeScore, awayScore: score.awayScore }
          : null
      );
    }
  }, [played, round]);

  const matchCalculations = ({
    homeScore,
    awayScore,
    goalScorersHome,
    goalScorersAway,
  }) => {
    //defining Objects
    const newSchedule = [...schedule];
    newSchedule[round][index].result = { homeScore, awayScore };
    newSchedule[round][index].scorers = { goalScorersHome, goalScorersAway };
    dispatch({ type: "updateSchedule", payload: newSchedule });

    const returnedTeams = calculateLeagueChanges(
      home,
      away,
      homeScore,
      awayScore,
      goalScorersHome,
      goalScorersAway
    );

    const newHome = returnedTeams.home;
    const newAway = returnedTeams.away;

    dispatch({
      type: "replaceTeam",
      payload: { id: ids[homeTeam], newTeam: newHome },
    });
    dispatch({
      type: "replaceTeam",
      payload: { id: ids[awayTeam], newTeam: newAway },
    });
  };

  return (
    <div>
      {home ? (
        <div>
          <div className="container flex-container">
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

          <div className="mt-2">
            {scorers
              ? maxGoals === "home"
                ? scorers.goalScorersHome.map((element, index) => {
                    return (
                      <div className="container flex-container">
                        <div className="flexItem">
                          {scorers.goalScorersHome[index]
                            ? scorers.goalScorersHome[index].name
                            : ""}
                        </div>
                        <div className="flexItem">
                          {scorers.goalScorersAway[index]
                            ? scorers.goalScorersAway[index].name
                            : ""}
                        </div>
                      </div>
                    );
                  })
                : scorers.goalScorersAway.map((element, index) => {
                    return (
                      <div className="container flex-container">
                        <div className="flexItem">
                          {scorers.goalScorersHome[index]
                            ? scorers.goalScorersHome[index].name
                            : ""}
                        </div>
                        <div className="flexItem">
                          {scorers.goalScorersAway[index]
                            ? scorers.goalScorersAway[index].name
                            : ""}
                        </div>
                      </div>
                    );
                  })
              : null}
          </div>

          <hr />
        </div>
      ) : null}
    </div>
  );
};

export default Match;
