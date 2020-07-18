import React from "react";
import { useSelector } from "react-redux";

const Table = (props) => {
  //return to home screen if the component was incorrectly accessed before initializing teams
  const initialTeams = useSelector((store) => store.statsReducer);
  if (!initialTeams.length) {
    props.history.push("./");
  }
  //
  const teams = useSelector((store) => store.statsReducer);
  const round = useSelector((store) => store.scheduleReducer.round);

  return (
    <div className="table-container">
      <div className="round-div">
        <h4>Round {round + 1}</h4>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">Points</th>
            {props.miniDisplay ? null : <th scope="col">Wins</th>}
            {props.miniDisplay ? null : <th scope="col">Draws</th>}
            {props.miniDisplay ? null : <th scope="col">Loses</th>}
            {props.miniDisplay ? null : <th scope="col">GF</th>}
            {props.miniDisplay ? null : <th scope="col">GA</th>}
            <th scope="col">GD</th>
          </tr>
        </thead>
        <tbody>
          {teams
            .sort((a, b) => {
              if (a.points > b.points) return -1;
              if (a.points < b.points) return +1;
              if (a.points === b.points) {
                const aDifference = a.goalsFor - a.goalsAgainst;
                const bDifference = b.goalsFor - b.goalsAgainst;

                return bDifference - aDifference;
              }
            })
            .map((team, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={team.logo} alt={team.name} />
                </td>
                <td>{team.points}</td>
                {props.miniDisplay ? null : <td>{team.wins}</td>}
                {props.miniDisplay ? null : <td>{team.draws}</td>}
                {props.miniDisplay ? null : <td>{team.loses}</td>}
                {props.miniDisplay ? null : <td>{team.goalsFor}</td>}
                {props.miniDisplay ? null : <td>{team.goalsAgainst}</td>}

                <td>
                  {team.goalsFor >= 0
                    ? team.goalsFor - team.goalsAgainst
                    : null}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
