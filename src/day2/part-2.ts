// Part 2
// Example answer: 2286
// Input answer: 79315

import { example, getGames, getGamePowers, getGameTotalMaps } from "./helpers";
import { GameMap } from "./types";

function getGamePowersOfValidGames(input: string) {
  const games: string[] = getGames(input);
  const gameMaxMaps: GameMap[] = getGameTotalMaps(games);

  const gamePowers: number[] = getGamePowers(gameMaxMaps);

  const sumOfGamePowers = gamePowers.reduce((acc, curr) => acc + curr, 0);

  return sumOfGamePowers;
}

console.log(getGamePowersOfValidGames(example));
