// 배열 모양 문자열을 파싱하는 미션
// [V] 배열의 중첩된 깊이와 원소 갯수를 출력하기
// [V] 괄호의 갯수를 파악하여, 매칭에 문제가 있는 경우 오류내용 출력하기
// [] 배열 분석 정보를 출력하기


class Stack {
  constructor(array) {
    this.elements = [];
    if (array) this.elements = array;
  }
  push(element) {
    this.elements.push(element);
  }
  pop() {
    if (this.isEmpty()) return false;
    return this.elements.pop();
  }
  peak() {
    if (this.isEmpty()) return false;
    return this.elements[this.elements.length - 1];
  }
  isEmpty() {
    return !this.elements.length;
  }
  copy() {
    return this.elements.slice();
  }
}

let data = '[1,2,[3,4,[5,[6]]]]';
//let data = '[1,2,[3,4,5,[6]]]]'; // error data
//let data = '[1,2,[3,4,[5,[6], 7], 8]]';
data = data.replace(/\[/g,'[,').replace(/\]/g, ',]');
const tokenList = data.split(',');
const answer = {
  startBracketNumber : 0,
  endBracktetNumber : 0,
  elementNumber : 0,
}

let stack = new Stack();
getBracketNumber();
//console.log(stack);

function getBracketNumber() {
  tokenList.forEach((token) => {
    stack.push(token);
    if (token === '[') {
      answer.startBracketNumber++;
    } else if (token === ']') {
      answer.endBracktetNumber++;
    } else {
      answer.elementNumber++;
    }
  });
  printMessage();
  return stack;
}

function printMessage() {
  if (answer.startBracketNumber === answer.endBracktetNumber) {
    console.log(`배열의 중첩된 깊이 수준은 ${answer.endBracktetNumber}이며, 총 ${answer.elementNumber}개의 원소가 포함되어 있습니다.`)
  } else {
    throw SyntaxError ('괄호 수가 일치하지 않습니다!');
  }
}

const result = {
  type : 'root',
  child : [],
};


const lexeredResult = lexer(tokenizer(stack.elements));
console.log(lexeredResult);
let parsedResult = parser(lexeredResult);
parsedResult = JSON.stringify(parsedResult, null, 2);
console.log(parsedResult);

function tokenizer(stack) {
  const stringfiedStack = JSON.stringify(stack).split('"');
  stringfiedStack.splice(0,1);
  stringfiedStack.splice(stringfiedStack.length-1,1);
  return stringfiedStack;
}

function lexer(tokenizedStack) {
  const regExp = /[0-9]/g;
  const lexeredStack = [];
  tokenizedStack.forEach((token) => {
    if (token === '[') {
      token = {
        type : 'array',
        child : [],
      };
      lexeredStack.push(token);
    } else if (token === ']') {
      token = {
        type : 'array_end'
      };
      lexeredStack.push(token);
    } else if (token.match(regExp)) {
      token = {
        type : 'number',
        value : token,
        child : [],
      };
      lexeredStack.push(token);
    }
  });
  return lexeredStack;
}

function parser(lexeredStack) {
  let currentArray = result;
  lexeredStack.forEach((currentStack) => {
    if (currentStack.type === 'array') {
      currentArray.child.push(currentStack);
      currentArray = currentStack;
    } else if (currentStack.type === 'number') {
      currentArray.child.push(currentStack);
    }
  });
  return result;
}
