import React from "react";
import { useSelector } from "react-redux";

const Table = (props) => {
  const teams = useSelector((store) => store.statsReducer);
  const round = useSelector((store) => store.scheduleReducer.round);

  return (
    <div style={{ margin: "5% 10%", textAlign: "center" }}>
      <div style={{ textAlign: "center", margin: "3%" }}>
        <h4>Round {round + 1}</h4>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">Points</th>
            {props.miniDisplay ? null : <th scope="col">Goals For</th>}
            {props.miniDisplay ? null : <th scope="col">Goals Against</th>}
            <th scope="col">Goal Difference</th>
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
