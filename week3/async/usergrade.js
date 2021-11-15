import * as readline from 'node:readline';
import GradeProgram from './mathgrade.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let koreanArray = [];
let mathArray = [];
let englishArray = [];

const question1 = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your subject? ', (answer) => {
      if (answer === 'korean' || answer === 'Korean') {
        resolve(koreanArray);
      } else if (answer === 'math' || answer === 'Math') {
        resolve(mathArray);
      } else if (answer === 'english' || answer === 'English') {
        resolve(englishArray);
      }
    });
  });
};

const question2 = (array) => {
  return new Promise((resolve, reject) => {
    rl.question('What is your grade? ', (answer) => {
      array.push(+answer);
      resolve(array);
    })
  })
}

const main = async () => {
  let gradeArray = await question1().then(question2);
  console.log(gradeArray);
  rl.close()
}

main();
