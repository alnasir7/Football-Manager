const calculateLeagueChanges = (
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  goalScorersHome,
  goalScorersAway
) => {
  var home = { ...homeTeam };
  var away = { ...awayTeam };

  var newHomePoints = 0;
  var newAwayPoints = 0;
  var homeWins = 0;
  var homeDraws = 0;
  var homeLoses = 0;
  var awayWins = 0;
  var awayDraws = 0;
  var awayLoses = 0;
  var newHomeGoalsFor = 0;
  var newAwayGoalsFor = 0;
  var newHomeGoalsAgainst = 0;
  var newAwayGoalsAgainst = 0;

  if (homeScore > awayScore) {
    if (home.points) newHomePoints = home.points + 3;
    else newHomePoints = 3;
    if (home.wins) homeWins = home.wins + 1;
    else homeWins = 1;

    if (away.points) newAwayPoints = away.points;
    else newAwayPoints = 0;
    if (away.loses) awayLoses = away.loses + 1;
    else awayLoses = 1;

    home.wins = homeWins;
    away.loses = awayLoses;
  }

  if (homeScore === awayScore) {
    if (home.points) newHomePoints = home.points + 1;
    else newHomePoints = 1;
    if (home.draws) homeDraws = home.draws + 1;
    else homeDraws = 1;

    if (away.points) newAwayPoints = away.points + 1;
    else newAwayPoints = 1;
    if (away.draws) awayDraws = away.draws + 1;
    else awayDraws = 1;

    away.draws = awayDraws;
    home.draws = homeDraws;
  }

  if (awayScore > homeScore) {
    if (home.points) newHomePoints = home.points;
    else newHomePoints = 0;
    if (home.loses) homeLoses = home.loses + 1;
    else homeLoses = 1;

    if (away.points) newAwayPoints = away.points + 3;
    else newAwayPoints = 3;
    if (away.wins) awayWins = away.wins + 1;
    else awayWins = 1;

    away.wins = awayWins;
    home.loses = homeLoses;
  }

  home.points = newHomePoints;
  away.points = newAwayPoints;

  if (home.goalsFor) newHomeGoalsFor = home.goalsFor + homeScore;
  else newHomeGoalsFor = homeScore;

  if (home.goalsAgainst) newHomeGoalsAgainst = home.goalsAgainst + awayScore;
  else newHomeGoalsAgainst = awayScore;

  if (away.goalsFor) newAwayGoalsFor = away.goalsFor + awayScore;
  else newAwayGoalsFor = awayScore;

  if (away.goalsAgainst) newAwayGoalsAgainst = away.goalsAgainst + homeScore;
  else newAwayGoalsAgainst = homeScore;

  away.goalsFor = newAwayGoalsFor;
  away.goalsAgainst = newAwayGoalsAgainst;
  home.goalsFor = newHomeGoalsFor;
  home.goalsAgainst = newHomeGoalsAgainst;

  if (home.players) var newHomePlayers = [...home.players];
  if (away.players) var newAwayPlayers = [...away.players];

  goalScorersHome.forEach((player) => {
    const newPlayer = {
      ...newHomePlayers.filter((player2) => player2.id === player.id)[0],
    };
    if (newPlayer.goals) newPlayer.goals++;
    else newPlayer.goals = 1;

    const newPlayers = newHomePlayers.map((player2) =>
      player2.id === newPlayer.id ? newPlayer : player2
    );
    newHomePlayers = [...newPlayers];
  });

  goalScorersAway.forEach((player) => {
    const newPlayer = {
      ...newAwayPlayers.filter((player2) => player2.id === player.id)[0],
    };
    if (newPlayer.goals) newPlayer.goals++;
    else newPlayer.goals = 1;

    const newPlayers = newAwayPlayers.map((player2) =>
      player2.id === newPlayer.id ? newPlayer : player2
    );
    newAwayPlayers = newPlayers;
  });

  home.players = newHomePlayers;
  away.players = newAwayPlayers;

  return { home, away };
};

export default calculateLeagueChanges;
