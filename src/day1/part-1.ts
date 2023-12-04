// Part 1
// Example answer: 142
// Input answer: 56465

const partOneInput: string = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

export function solve(input: string) {
  const items: string[] = input.split("\n");

  const itemsWithNumbersOnly: string[][] = items.map((item) => {
    const itemNumbers: string[] = [];
    item
      .split("")
      .forEach(
        (char) => !Number.isNaN(parseInt(char)) && itemNumbers.push(char)
      );

    return itemNumbers;
  });

  const calibrationValues = itemsWithNumbersOnly.map((itemArr) => {
    const first = itemArr[0];
    // If there is only one number, use the first as last
    const last = itemArr[itemArr.length - 1] ?? itemArr[0];

    const firstAndLast = [first, last];
    const joined = firstAndLast.join("");
    return parseInt(joined);
  });

  return calibrationValues.reduce((acc, curr) => acc + curr, 0);
}

console.log(solve(partOneInput));
