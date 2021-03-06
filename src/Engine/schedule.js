import { round, random } from "lodash";

const array = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
];

const getFrom = (from) => {
  const newArray = [];
  var item = from;
  for (var i = 0; i < 19; i++) {
    newArray.push(item);
    if (item === array.length - 1) item = 0;
    else item++;
  }

  return newArray;
};

const generateSchedule = () => {
  const schedule = [];
  for (var y = 0; y < 19; y++) {
    schedule[y] = [];
  }
  const startingPoints = getFrom(0);

  for (var i = 0; i < 19; i++) {
    const games = getFrom(startingPoints[i]);

    games.forEach((item, index) => {
      if (index >= i) schedule[item].push({ teams: [index, i] });
    });
  }

  const finalSchedule = schedule.map(fixRound);
  const returnedSchedule = randomize(finalSchedule);
  returnedSchedule.forEach((round) => {
    const reversedRound = [];

    round.forEach((item) => {
      reversedRound.push({ teams: [item.teams[1], item.teams[0]] });
    });

    returnedSchedule.push(reversedRound);
  });

  return returnedSchedule;
};

const randomize = (schedule) => {
  const schedule1 = schedule.sort((a, b) => 0.5 - Math.random());

  const schedule2 = schedule1.map((round) =>
    round.sort((a, b) => 0.5 - Math.random())
  );

  const schedule3 = [
    ...schedule2.map((round, index) =>
      round.map((match) => {
        return { teams: match.teams.sort((a, b) => 0.5 - Math.random()) };
      })
    ),
  ];

  return schedule3;
};

const fixRound = (round) => {
  const newRound = round.map((item) => {
    if (item.teams[0] === item.teams[1]) return { teams: [item.teams[0], 19] };
    else return item;
  });

  return newRound;
};

export default generateSchedule;
