// 배열 모양 문자열을 파싱하는 미션
// [V] 배열의 중첩된 깊이와 원소 갯수를 출력하기
// [V] 괄호의 갯수를 파악하여, 매칭에 문제가 있는 경우 오류내용 출력하기
// [] 배열 분석 정보를 출력하기


let data = "[1,2,[3,4,[5,[6]]]]"
//let data = "[1,2,[3,4,5,[6]]]]" // error data
data = data.replace(/,/g, '');
const tokenList = data.split('');
const answer = {
  startBracketNumber : 0,
  endBracktetNumber : 0,
  elementNumber : 0,
  elements : [],
}


// 배열을 이용한 문제 풀이
/*
getNumbers(tokenList);
console.log(answer);

function getNumbers(tokenList) {
  tokenList.forEach((token) => {
    if (token === '[') {
      answer.startBracketNumber++;
    } else if (token === ']') {
      answer.endBracktetNumber++;
    } else if (token !== '[' && token !== ']') {
      answer.elementNumber++;
    }
  });
  findError();
};

function findError() {
  if (answer.startBracketNumber !== answer.endBracktetNumber) {
    throw SyntaxError ('닫는 괄호가 일치하지 않습니다!');
  }
}

*/


// stack을 이용한 문제 풀이
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

let myStack = new Stack();
tokenList.forEach((token) => {
  myStack.push(token);
});

function findArray(stack) {
  let copiedStack = new Stack(stack.copy());
  getArray(copiedStack);
}

function getArray(stack) {
  const stackLength = stack.elements.length
  for (let i = 0; i < stackLength; i++) {
    let stackElement = stack.pop();
    if (stackElement === '[') {
      answer.startBracketNumber++;
    } else if (stackElement === ']') {
      answer.endBracktetNumber++;
    } else if (stackElement !== '[' && stackElement !== ']') {
      answer.elementNumber++;
    }
  }
  findError();
}

function findError() {
  if (answer.startBracketNumber !== answer.endBracktetNumber) {
    throw SyntaxError ('닫는 괄호가 일치하지 않습니다!');
  }
}

//console.log(myStack);
findArray(myStack);
console.log(answer);


// stack, 재귀를 이용한 문제 풀이(미완성)
/*
function getArray(stack) {
  let isEnd = false;
  while (!isEnd) {
    const stackElement = stack.pop();
    if (stackElement === '[') {
      answer.startBracketNumber++;
      return;
    } else if (stackElement === ']') {
      answer.endBracktetNumber++;
      poppedStack = stack;
      getArray(poppedStack);
      return;
    } else if (stackElement !== '[' && stackElement !== ']') {
      answer.elementNumber++;
      answer.elements.push(stackElement);
    } else if (!stackElement) {
      isEnd = true;
      return;
    }
  }
}
*/
