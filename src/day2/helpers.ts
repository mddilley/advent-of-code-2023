import { GameMap, GameValidityMap } from "./types";

export const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const partOneActualTotals: GameMap = {
  blue: 14,
  green: 13,
  red: 12,
};

export function getGames(input: string) {
  return input.split("\n");
}

export function makeGameMaxMapFromTurns(turns: string[]) {
  const turnColorsAndNumbers: string[][] = turns.map((turn) =>
    turn.split(", ")
  );

  return turnColorsAndNumbers.reduce((acc, curr) => {
    curr.forEach((curr) => {
      const numberOfColor: number = parseInt(curr.split(" ")[0]);
      const colorName: string = curr.split(" ")[1];

      const prevMax: number | undefined = acc[colorName];
      const possibleMax: number = numberOfColor;

      if (prevMax === undefined) {
        acc[colorName] = possibleMax;
      }

      if (prevMax && prevMax < possibleMax) {
        acc[colorName] = possibleMax;
      }
    });
    return acc;
  }, {} as GameMap);
}

export function getGameTotalMaps(games: string[]) {
  return games.map((game) => {
    const gameAndTurns = game.split(": ");
    const turns = gameAndTurns[1].split("; ");
    const gameTotalMap = makeGameMaxMapFromTurns(turns);

    return gameTotalMap;
  });
}

export function makeGameValidityMaps(gameMaxMaps: GameMap[]) {
  return gameMaxMaps.reduce((acc, curr, i) => {
    let isValid = true;

    Object.entries(curr).forEach(([colorName, total]) => {
      const actualColorTotal = partOneActualTotals[colorName];
      const gameTotal = total;

      if (gameTotal > actualColorTotal) {
        isValid = false;
      }
    });

    return { ...acc, [i + 1]: isValid };
  }, {} as GameValidityMap);
}

export function getGamePowers(gameMaxMaps: GameMap[]) {
  return gameMaxMaps.map((gameMap) =>
    Object.values(gameMap).reduce((acc, curr) => curr * acc, 1)
  );
}
