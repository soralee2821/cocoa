// 2. filter array
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

/* for 문을 이용한 풀이
let peopleArray = [];

for (let peopleID of peoples) {
  const regExp = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  if (!regExp.test(peopleID)) {
    const filteredID = peopleID.replace(/[0-9]/g,"");
    peopleArray.push(filteredID);
  }
}
console.log(peopleArray);

// filter, map을 이용한 풀이
const regExp = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
let filteredPeoples = peoples.filter((peopleID) => {
  return regExp.test(peopleID) ? false : true;
}).map((peopleID) => peopleID.replace(/[0-9]/g,""));
console.log(filteredPeoples);
*/

// regExp을 이용하지 않은 풀이
let filteredPeoples = peoples.filter((peopleID) => findSpecialChars(peopleID) === false).map(deleteNumber);
console.log(filteredPeoples);

function findSpecialChars(peopleID) {
  const specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
  let isSpecial = false;
  for (let char of specialChars) {
      isSpecial = peopleID.includes(char);
      if (isSpecial) return isSpecial;
  }
  return isSpecial;
};

function deleteNumber(peopleID) {
  const number = "0123456789";
  let filteredID = peopleID;
  for (let digit of number) {
    const digitIndex = peopleID.indexOf(digit);
    if (digitIndex !== -1) {
      filteredID = peopleID.slice(0, digitIndex) + peopleID.slice(digitIndex + 1);
      return filteredID;
    }
  }
  return filteredID;
}
