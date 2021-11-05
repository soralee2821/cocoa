console.log(solution(2, 5, 3, 2));

function solution(numericalSystem, numberCount, totalPlayers, gildongOrder) {
  const numberArray = getNumberArray(numericalSystem, numberCount);
  return {
    totalNumber : numberArray,
    gildong : findGildongNumber(totalPlayers, gildongOrder, numberArray)
  };
}

function getNumberArray(numericalSystem, numberCount) {
  let numberArray = [];

  for (let number = 1; number <= numberCount; number++) {
    let convertedNumber = number.toString(numericalSystem);
    convertedNumber = convertedNumber.split('');
    numberArray.push(...convertedNumber);
  }
  return numberArray;
}

function findGildongNumber(totalPlayers, gildongOrder, numberArray) {
  let gildongNumber = [];

  numberArray.forEach((number, index) => {
    if ((index + 1) % totalPlayers === gildongOrder) gildongNumber.push(number);
  })
  return gildongNumber;
}
