class PlayerMoveManager {
  constructor() {
    this.stageMap = [];
    this.startingPosition = [];
  }
  makeStartingPoint(file) {
    const lines = file.split('\n');
    let isMap2 = false;
  
    for (let line of lines) {
      if (line.includes('Stage 2')) {
        isMap2 = true;
        console.log(line);
        console.log('');
        continue;
      }
      if (line.includes('=')) {
        isMap2 = false;
      }
      if (isMap2) {
        console.log(line);
        const characters = line.trimEnd().split('');
        this.stageMap.push(characters);
      }
    }
    this.startingPosition = this.findPlayer(this.stageMap);
  }
  
  findPlayer(stageMap) {
    for (let rowIndex = 0; rowIndex < stageMap.length; rowIndex++) {
      const colIndex = stageMap[rowIndex].indexOf('P');
      if (colIndex !== -1) {
        this.startingPosition.push(rowIndex, colIndex);
        return this.startingPosition;
      }
    }
  }

  analyzeInput(input, stageMap, playerPosition) {
    let currentPosition = new Array(...playerPosition);
    switch(input) {
      case 'w': case 'W':
        currentPosition[0]--;
        currentPosition = this.changePosition(input, stageMap, playerPosition, currentPosition);
        break;
      case 'a': case 'A':
        currentPosition[1]--;
        currentPosition = this.changePosition(input, stageMap, playerPosition, currentPosition);
        break;
      case 's': case 'S':
        currentPosition[0]++;
        currentPosition = this.changePosition(input, stageMap, playerPosition, currentPosition);
        break;
      case 'd': case 'D':
        currentPosition[1]++;
        currentPosition = this.changePosition(input, stageMap, playerPosition, currentPosition);
        break;
      default:
        console.log(`${input} : (경고!) 해당 명령을 수행할 수 없습니다!`);
    }
    return currentPosition;
  }
  changePosition(input, stageMap, beforePosition, currentPosition) {
    const changedPosition = stageMap[currentPosition[0]][currentPosition[1]];
    if (changedPosition === ' ') {
      console.log(`${input} : ${this.checkDirection(input)}으로 이동합니다.`);
      stageMap[beforePosition[0]][beforePosition[1]] = ' ';
      stageMap[currentPosition[0]][currentPosition[1]] = 'P';
      return currentPosition;
    } else {
      console.log(`${input} : (경고!) 해당 명령을 수행할 수 없습니다!`);
      currentPosition = beforePosition;
      return currentPosition;
    }
  }
  
  checkDirection(input) {
    let direction = '';
    switch(input) {
      case 'w': case 'W':
        direction = '위쪽'
        break;
      case 'a': case 'A':
        direction = '왼쪽';
        break;
      case 's': case 'S':
        direction = '아래쪽';
        break;
      case 'd': case 'D':
        direction = '오른쪽';
        break;
    }
    return direction;
  }
  
  printStageMap(stageMap) {
    stageMap.forEach((lineArray) => {
      const line = lineArray.join('');
      console.log(line);
    });
  }
}

const fs = require('fs');
const readline = require('readline');
const file = fs.readFileSync('map.txt', 'utf-8');
const moveManager = new PlayerMoveManager();
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });
let updatedPosition = moveManager.startingPosition;

moveManager.makeStartingPoint(file);

rl.setPrompt('SOKOBAN> ');
rl.prompt();

rl.on('line', function(line) {
  line = line.trim();
  switch(line) {
    case 'q': case 'Q':
      rl.close();
      break;
    default:
      if (line.length === 1) {
        updatedPosition = moveManager.analyzeInput(line, moveManager.stageMap, updatedPosition);
        moveManager.printStageMap(moveManager.stageMap);
        break;
      }
      const characters = line.split('');
      characters.forEach((character) => {
        updatedPosition = moveManager.analyzeInput(character, moveManager.stageMap, updatedPosition);
        moveManager.printStageMap(moveManager.stageMap);
      });
      break;
    }
  rl.prompt();
});
rl.on('close', function() {
    console.log('Bye~');
    process.exit();
});
