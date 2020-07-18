export default function getGoals(players) {
  const playerWeights = players.map((player) => player.goalRate);
  const scorerIndex = generate(playerWeights);
  const scorer = players[scorerIndex];

  return scorer;
}

const generate = (weights) => {
  var i,
    sum = 0,
    total = 0;
  for (i in weights) {
    total += weights[i];
  }

  var randomNumber = getRandomInt(1, total);

  for (i in weights) {
    sum += weights[i];

    if (randomNumber <= sum) return i;
  }
};
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const findTopScorers = (teams) => {
  const highScorers = [];
  teams.forEach((team) => {
    if (team.players)
      team.players.forEach((player) => {
        if (player.goals)
          if (player.goals >= 0) {
            highScorers.push({ player, team });
          }
      });
  });
  const sortedScorers = [
    ...highScorers.sort((a, b) => b.player.goals - a.player.goals),
  ];

  const topHihgScorers = [...sortedScorers.splice(0, 10)];

  return topHihgScorers;
};
