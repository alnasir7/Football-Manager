import React, { useState } from "react";
import { useSelector } from "react-redux";
import { findTopScorers } from "../Engine/goalScoring";

const GoalScorers = (props) => {
  //return to home screen if the component was incorrectly accessed before initializing teams
  const initialTeams = useSelector((store) => store.statsReducer);
  if (!initialTeams.length) {
    props.history.push("./");
  }
  //
  const teams = useSelector((store) => store.statsReducer);
  const topHihgScorers = findTopScorers(teams);

  return (
    <div style={{ margin: "5% 10%", textAlign: "center" }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Player</th>
            <th scope="col">Team</th>
            <th scope="col">Goals</th>
          </tr>
        </thead>
        <tbody>
          {topHihgScorers.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.player.name}</td>
              <td>
                <img src={item.team.logo} alt={item.team.name} />
              </td>
              <td>{item.player.goals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GoalScorers;
