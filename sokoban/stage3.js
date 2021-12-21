class SOKOBANGameManager {
  constructor(file) {
    this.file = file;
    this.stageMap = [];
    this.currentMap = [];
    this.startingPosition = [];
    this.updatedPosition = [];
    this.holeCount = 0;
    this.score = 0;
    this.turnCount = 0;
    this.stageLevel = 5;
  }

  init() {
    this.stageMap = [];
    this.currentMap = [];
    this.startingPosition = [];
    this.holeCount = 0;
    this.score = 0;
    this.turnCount = 0;
    this.selectStage(this.file, this.stageLevel);
    this.currentMap = JSON.parse(JSON.stringify(this.stageMap));
    this.startingPosition = this.findPlayer();
    this.updatedPosition = JSON.parse(JSON.stringify(this.startingPosition));
    this.holeCount = this.getValueCount('O');
    this.score = this.getValueCount('0');
  }

  selectStage(file, stageLevel) {
    const lines = file.split('\n');
    let isMap2 = false;
    for (let line of lines) {
      if (line.includes(`Stage ${stageLevel}`)) {
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
    return this.stageMap;
  }
  
  findPlayer() {
    for (let rowIndex = 0; rowIndex < this.stageMap.length; rowIndex++) {
      const colIndex = this.stageMap[rowIndex].indexOf('P');
      if (colIndex !== -1) {
        this.startingPosition.push(rowIndex, colIndex);
        return this.startingPosition;
      }
    }
  }

  getValueCount(value) {
    let valueCount = 0;
    this.stageMap.forEach((line) => {
      line.reduce((accumulator, currentValue) => {
        if (currentValue === value) {
          accumulator++;
        }
        valueCount = accumulator;
        return accumulator;
      }, valueCount);
    });
    return valueCount;
  }

  analyzeLine(line) {
    if (line.length === 1) {
      this.updatedPosition = this.analyzeInput(line, 'P', this.updatedPosition);
      this.printStageState(this.currentMap);
      return this.updatedPosition;
    }
    const characters = line.split('');
    characters.forEach((character) => {
      this.updatedPosition = this.analyzeInput(character, 'P', this.updatedPosition);
      this.printStageState(this.currentMap);
    });
    return this.updatedPosition;
  }

  analyzeInput(input, item, playerPosition) {
    let currentPosition = JSON.parse(JSON.stringify(playerPosition));
    switch(input) {
      case 'w': case 'W':
        currentPosition[0]--;
        currentPosition = this.choosePositionFunction(input, item, playerPosition, currentPosition);
        break;
      case 'a': case 'A':
        currentPosition[1]--;
        currentPosition = this.choosePositionFunction(input, item, playerPosition, currentPosition);
        break;
      case 's': case 'S':
        currentPosition[0]++;
        currentPosition = this.choosePositionFunction(input, item, playerPosition, currentPosition);
        break;
      case 'd': case 'D':
        currentPosition[1]++;
        currentPosition = this.choosePositionFunction(input, item, playerPosition, currentPosition);
        break;
      case 'r': case 'R':
        console.log('처음부터 시작합니다.');
        break;
      default:
        console.log(`${input} : (경고!) 해당 명령을 수행할 수 없습니다!`);
    }
    return currentPosition;
  }

  choosePositionFunction(input, item, playerPosition, currentPosition) {
    if (item === 'P') {
      return this.changePlayerPosition(input, playerPosition, currentPosition);
    } else if (item === 'o') {
      return this.changeBallPosition(currentPosition);
    }
  }

  changePlayerPosition(input, beforePosition, currentPosition) {
    let beforeState = this.currentMap[beforePosition[0]][beforePosition[1]];
    let currentState = this.currentMap[currentPosition[0]][currentPosition[1]];
    switch (currentState) {
      case ' ':
        console.log(`${input} : ${this.checkDirection(input)}으로 이동합니다.`);
        this.currentMap[beforePosition[0]][beforePosition[1]] = beforeState === 'O' ? 'O' : ' ';
        this.currentMap[currentPosition[0]][currentPosition[1]] = 'P';
        this.turnCount++;
        break;
      case 'O':
        console.log(`${input} : ${this.checkDirection(input)}으로 이동합니다.`);
        this.currentMap[beforePosition[0]][beforePosition[1]] = ' ';
        this.turnCount++;
        break;
      case 'o':
        currentPosition = this.pushBall(input, 'P', beforePosition, currentPosition);
        break;
      case '0':
        currentPosition = this.pushBall(input, 'O', beforePosition, currentPosition);
        break;
      case '#':
        currentPosition = beforePosition;
        console.log(`${input} : (경고!) 해당 명령을 수행할 수 없습니다!`);
        break;
      default:
        currentPosition = beforePosition;
        console.log(`${input} : (경고!) 해당 명령을 수행할 수 없습니다!`);
    }
    return currentPosition;
  }
  
  pushBall(input, currentState, beforePosition, currentPosition) {
    let beforeState = this.currentMap[beforePosition[0]][beforePosition[1]];
    if (this.analyzeInput(input, 'o', currentPosition)) {
      this.holeCount = currentState === 'O' ? ++this.holeCount : this.holeCount;
      console.log(`${input} : ${this.checkDirection(input)}으로 이동합니다.`);
      this.currentMap[beforePosition[0]][beforePosition[1]] = beforeState === 'O' ? 'O' : ' ';
      this.currentMap[currentPosition[0]][currentPosition[1]] = currentState;
      this.turnCount++;
    } else if (!this.analyzeInput(input, 'o', currentPosition)) {
      currentPosition = beforePosition;
      console.log(`${input} : (경고!) 해당 명령을 수행할 수 없습니다!`);
    }
    return currentPosition;
  }

  checkDirection(input) {
    let direction = '';
    switch(input) {
      case 'w': case 'W':
        direction = '위쪽';
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

  changeBallPosition(currentPosition) {
    let currentState = this.currentMap[currentPosition[0]][currentPosition[1]];
    let canMove = true;
    switch (currentState) {
      case ' ':
        this.currentMap[currentPosition[0]][currentPosition[1]] = 'o';
        break;
      case 'O':
        this.currentMap[currentPosition[0]][currentPosition[1]] = '0';
        this.holeCount--;
        break;
      case 'o': case '0': case '#':
        canMove = false;
        break;
    }
    return canMove;
  }

  printStageState(currentMap) {
    currentMap.forEach((lineArray) => {
      const line = lineArray.join('');
      console.log(line);
    });
    console.log("hole : ", this.holeCount);
    console.log("turn : ", this.turnCount);
  }

  goNextStage(){
    if (this.holeCount === 0) {
      this.stageLevel++;
      if (this.stageLevel === 6) {
        console.log("Congratulation~!! You success SOKOBAN Game!");
        return true;
      } else if (this.stageLevel < 6) {
        this.init();
        return false;
      }
    }
  }
}

const fs = require('fs');
const readline = require('readline');
const file = fs.readFileSync('map.txt', 'utf-8');
const gameManager = new SOKOBANGameManager(file);
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

rl.setPrompt('SOKOBAN> ');
gameManager.init();
rl.prompt();
rl.on('line', function(line) {
  line = line.trim();
  switch(line) {
    case 'r': case 'R':
      gameManager.init();
      gameManager.analyzeLine(line);
      break;
    case 'q': case 'Q':
      rl.close();
      break;
    default:
      gameManager.analyzeLine(line);
      if (gameManager.goNextStage()) {
        rl.close();
      }
      break;
    }
  rl.prompt();
});

rl.on('close', function() {
    console.log('Bye~');
    process.exit();
});
