import React from "react";
import { useSelector } from "react-redux";

const Table = () => {
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
          </tr>
        </thead>
        <tbody>
          {teams
            .sort((a, b) => b.points - a.points)
            .map((team, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={team.logo} alt={team.name} />
                </td>
                <td>{team.points}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
