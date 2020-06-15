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

  return { homeScore, awayScore };
}

const findWeights = (mode, level) => {
  var weights;
  if (mode === "attack") {
    switch (level) {
      case 1:
        weights = { 0: 6, 1: 18, 2: 18, 3: 10, 4: 1, 5: 0, 6: 0, 7: 0 };
        break;

      case 2:
        weights = { 0: 4, 1: 12, 2: 16, 3: 16, 4: 4, 5: 1, 6: 0, 7: 0 };
        break;

      case 3:
        weights = { 0: 2, 1: 8, 2: 18, 3: 22, 4: 13, 5: 3 };
        break;

      case 4:
        weights = { 0: 2, 1: 6, 2: 12, 3: 22, 4: 25, 5: 10, 6: 1 };
        break;

      case 5:
        weights = { 0: 1, 1: 4, 2: 11, 3: 14, 4: 32, 5: 24, 6: 4, 7: 1 };
        break;

      case 6:
        weights = { 0: 1, 1: 4, 2: 8, 3: 12, 4: 38, 5: 32, 6: 8, 7: 3 };
        break;
    }
  }

  if (mode === "deffense") {
    switch (level) {
      case 1:
        weights = { 0: 5, 1: 18, 2: 12, 3: 4, 4: 1 };
        break;

      case 2:
        weights = { 0: 3, 1: 15, 2: 17, 3: 8, 4: 3, 5: 1 };
        break;

      case 3:
        weights = { 0: 2, 1: 5, 2: 18, 3: 15, 4: 6, 5: 1 };
        break;

      case 4:
        weights = { 0: 1, 1: 6, 2: 12, 3: 15, 4: 14, 5: 4 };
        break;

      case 5:
        weights = { 0: 0, 1: 2, 2: 10, 3: 18, 4: 22, 5: 7 };
        break;

      case 6:
        weights = { 0: 0, 1: 0, 2: 7, 3: 15, 4: 21, 5: 9 };
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
