class MapDataManager {
  make2DArray(line, numberArray) {
    const characters = line.trimEnd().split('');
    const convertednumberArray = characters.map((character) => this.convertToNumber(character));
    numberArray.push(convertednumberArray);
    return numberArray;
  }
  
  convertToNumber(character) {
    switch (character) {
      case '#':
        character = 0;
        break;
      case 'O':
        character = 1;
        break;
      case 'o':
        character = 2;
        break;
      case 'P':
        character = 3;
        break;
      case '=':
        character = 4;
        break;
      case ' ':
        character = ' ';
    }
    return character;
  }
  
  printStageDetail(numberArray) {
    const lengthArray = numberArray.map(numbers => numbers.length);
    const details = {
      '가로길이': Math.max(...lengthArray),
      '세로길이': numberArray.length,
      '구멍의 수': 0,
      '공의 수': 0,
      '플레이어 위치': []
    }
    this.calculateCount(details, numberArray);
    for (const [key, value] of Object.entries(details)) {
      console.log(`${key} : ${value}`);
    }
  }
  
  calculateCount(details, numberArray) {
    numberArray.forEach((numbers, index) => {
      if (numbers.includes(1)) {
        details['구멍의 수'] = this.checkValueCount(1, details['구멍의 수'], numbers);
      }
      if (numbers.includes(2)) {
        details['공의 수'] = this.checkValueCount(2, details['공의 수'], numbers);
      }
      if (numbers.includes(3)) {
        const xPosition = index + 1;
        const yPosition = numbers.indexOf(3) + 1;
        details['플레이어 위치'].push(xPosition, yPosition);
      }
    });
    return details;
  }
  
  checkValueCount(value, valueCount, numbers) {
    let totalCount = valueCount;
    numbers.reduce((accumulater, currentValue) => {
      if (currentValue === value) {
        accumulater++;
      }
      totalCount = accumulater;
      return accumulater;
    }, totalCount);
    return totalCount;
  }
}

const fs = require('fs');
const mapDataManager = new MapDataManager();

fs.readFile('map.txt', 'utf-8', (err, file) => {
  const lines = file.split('\n');
  let numberArray = [];

  for (let line of lines) {
    if (line.startsWith('S')) {
      console.log(line);
      console.log('');
      continue;
    } else if (line.startsWith('=')) {
      console.log('');
      mapDataManager.printStageDetail(numberArray);
      numberArray = [];
      console.log('');
      continue;
    }
    console.log(line);
    mapDataManager.make2DArray(line, numberArray);
  }
  mapDataManager.printStageDetail(numberArray);
});
