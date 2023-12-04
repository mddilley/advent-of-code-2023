// Part 1
// Example answer: 8
// Input answer: 2085

import { getGames, getGameTotalMaps, makeGameValidityMaps } from "./helpers";
import { GameMap, GameValidityMap } from "./types";

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

function getSumOfValidGameIds(input: string) {
  const games: string[] = getGames(input);
  const gameMaxMaps: GameMap[] = getGameTotalMaps(games);
  const gamesValidityMap: GameValidityMap = makeGameValidityMaps(gameMaxMaps);

  const sumOfValidGameIds = Object.entries(gamesValidityMap).reduce(
    (acc, [gameNumber, isValid]) => {
      if (isValid) {
        return acc + parseInt(gameNumber);
      } else {
        return acc;
      }
    },
    0
  );
  return sumOfValidGameIds;
}

console.log(getSumOfValidGameIds(example));
