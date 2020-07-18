import getGoals from "./goalScoring";
import NormalDistribution from "normal-distribution";

export default function matchGenerate(home, away) {
  //finding weights
  const homeGoals = generate(findWeights("attack", home.attack + 1));
  const homeDefense = generate(findWeights("deffense", home.deffense + 1));
  const awayGoals = generate(findWeights("attack", away.attack));
  const awayDefense = generate(findWeights("deffense", away.deffense));

  //gettign the final score from attack and defense scores
  var homeScore = homeGoals - awayDefense;
  if (homeScore < 0) {
    homeScore = 0;
  }
  var awayScore = awayGoals - homeDefense;
  if (awayScore < 0) {
    awayScore = 0;
  }

  // fixing weird results
  if (homeScore + awayScore >= 4) {
    var x = Math.random();
    if (x < 0.7) {
      homeScore--;
      awayScore--;
      if (awayScore < 0) awayScore = 0;
      if (homeScore < 0) homeScore = 0;
    }
  }

  if (homeScore + awayScore <= 1) {
    var x = Math.random();
    if (x < 0.7) {
      homeScore++;
      awayScore++;
    }
  }

  if (homeScore - awayScore > 2) {
    var x = Math.random();
    if (x < 0.2 * away.deffense) {
      homeScore--;
    }
    if (x < 0.15 * away.deffense) {
      homeScore--;
    }
  }
  if (awayScore - homeScore > 2) {
    var x = Math.random();
    if (x < 0.2 * home.deffense) {
      awayScore--;
    }
    if (x < 0.15 * home.deffense) {
      awayScore--;
    }
  }

  //getting the scorers of the goals for teams with valid players

  const goalScorersHome = [];
  if (home.players) {
    for (let i = 0; i < homeScore; i++)
      goalScorersHome.push(getGoals(home.players));
  }
  const goalScorersAway = [];
  if (away.players) {
    for (let i = 0; i < awayScore; i++)
      goalScorersAway.push(getGoals(away.players));
  }

  if (homeScore < 0) homeScore = 0;
  if (awayScore < 0) awayScore = 0;
  return { homeScore, awayScore, goalScorersAway, goalScorersHome };
}

const findWeights = (mode, level) => {
  //randomizing an attack score for each team based on drawing a sample from a normal distribution where the mean is a function of the teams fixed attack level
  if (mode === "attack") {
    const normDist = new NormalDistribution(level - 1.2, 1.4);
    var weights = {};
    for (var i = 0; i <= 7; i++) {
      weights[i] = Math.round(50 * normDist.pdf(i));
    }
  }
  //randomizing an deffense score for each team based on drawing a sample from a normal distribution where the mean is a function of the teams fixed deffense level
  if (mode === "deffense") {
    const normDist = new NormalDistribution(level - 1.5, 1.4);
    var weights = {};
    for (var i = 0; i <= 7; i++) {
      weights[i] = Math.round(50 * normDist.pdf(i));
    }
  }

  return weights;
};

const generate = (weights) => {
  //generates a random number from a group of weigthed numbers, where the weight determines the probability of the number being selected
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
  //generates a random number within a defined interval
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
