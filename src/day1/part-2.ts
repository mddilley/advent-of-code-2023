// Part 2
// Example answer: 281
// Input answer: 55902

const partTwoInput: string = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const numberStringsMap: { [key: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const numberStrings: string[] = Object.keys(numberStringsMap);

function isNumber(string: string) {
  return !Number.isNaN(parseInt(string));
}

function doesContainLetterDigits(item: string) {
  return numberStrings.some((numberString) => item.includes(numberString));
}

function translateLetterDigits(item: string) {
  let translated: string[] = [];

  for (let i = 0; i < item.length; i++) {
    const char = item[i];

    // Push strings that can be parsed to ints or matched number strings
    if (isNumber(char)) {
      translated.push(char);
    } else {
      numberStrings.forEach((numberString) => {
        const start = i;
        const endOfNumberString = numberString.length;
        const substringTest = item.substring(start, start + endOfNumberString);

        if (substringTest.includes(numberString)) {
          translated.push(numberStringsMap[numberString]);
        }
      });
    }
  }

  return translated;
}

export function solve(input: string) {
  const items: string[] = input.split("\n");

  const itemsWithNumbersOnly: string[][] = items.map((item) => {
    let itemArr: string[] = [];

    if (doesContainLetterDigits(item)) {
      itemArr = translateLetterDigits(item);
    } else {
      itemArr = item.split("");
    }

    const itemNumbers: string[] = [];

    itemArr.forEach((char) => isNumber(char) && itemNumbers.push(char));

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

console.log(solve(partTwoInput));
