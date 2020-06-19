export default function match(home, away) {
  const homeGoals = generate(findWeights("attack", home.attack + 1));
  const homeDefense = generate(findWeights("deffense", home.deffense + 1));
  const awayGoals = generate(findWeights("attack", away.attack));
  const awayDefense = generate(findWeights("deffense", away.deffense));

  var homeScore = homeGoals - awayDefense;
  if (homeScore < 0) {
    homeScore = 0;
  }
  var awayScore = awayGoals - homeDefense;
  if (awayScore < 0) {
    awayScore = 0;
  }

  if (homeScore + awayScore < 3) {
    var x = Math.random();
    if (x < 0.35) {
      homeScore++;
      awayScore++;
    }
  }

  if (homeScore + awayScore > 6) {
    var x = Math.random();
    if (x < 0.3) {
      homeScore--;
      awayScore--;
      if (awayScore < 0) awayScore = 0;
    }
  }

  return { homeScore, awayScore };
}

const findWeights = (mode, level) => {
  var weights;
  if (mode === "attack") {
    switch (level) {
      case 1:
        weights = { 0: 4, 1: 20, 2: 28, 3: 12, 4: 0, 5: 0, 6: 0, 7: 0 };
        break;

      case 2:
        weights = { 0: 2, 1: 15, 2: 39, 3: 14, 4: 2, 5: 0, 6: 0, 7: 0 };
        break;

      case 3:
        weights = { 0: 2, 1: 14, 2: 37, 3: 26, 4: 5, 5: 1 };
        break;

      case 4:
        weights = { 0: 2, 1: 6, 2: 29, 3: 33, 4: 15, 5: 2, 6: 1 };
        break;

      case 5:
        weights = { 0: 1, 1: 2, 2: 14, 3: 28, 4: 28, 5: 12, 6: 2 };
        break;

      case 6:
        weights = { 0: 0, 1: 1, 2: 5, 3: 28, 4: 33, 5: 16, 6: 1, 7: 1 };
        break;
    }
  }

  if (mode === "deffense") {
    switch (level) {
      case 1:
        weights = { 0: 12, 1: 25, 2: 12, 3: 1 };
        break;

      case 2:
        weights = { 0: 9, 1: 28, 2: 12, 3: 3, 4: 1 };
        break;

      case 3:
        weights = { 0: 6, 1: 18, 2: 18, 3: 8, 4: 3 };
        break;

      case 4:
        weights = { 0: 4, 1: 12, 2: 20, 3: 15, 4: 6, 5: 1 };
        break;

      case 5:
        weights = { 0: 0, 1: 10, 2: 19, 3: 18, 4: 9, 5: 3 };
        break;

      case 6:
        weights = { 0: 0, 1: 5, 2: 12, 3: 25, 4: 11, 5: 4 };
        break;
    }
  }

  return weights;
};

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
