import * as readline from 'node:readline';
import GradeProgram from './mathgrade.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const grade = {
  korean : [],
  math : [],
  english : [],
}

const setSubject = () => {
  return new Promise((resolve, reject) => {
    rl.question('What is your subject? (Korean/ Math/ English)  ', (answer) => {
      if (answer === 'Korean' || answer === 'korean') {
        resolve(grade.korean);
      } else if (answer === 'Math' || answer === 'math') {
        resolve(grade.math);
      } else if (answer === 'English' || answer === 'english') {
        resolve(grade.english);
      } else {
        throw new Error ('you write the wrong subject!');
      }
    });
  });
}

const setGrade = (array) => {
  return new Promise((resolve, reject) => {
    rl.question('What is your grade? ', (answer) => {
      array.push(+answer);
      resolve(grade);
    })
  })
}

const askQuestion = async () => {
  let gradeArray = await setSubject().then(setGrade);
  console.log(gradeArray);
}

const excute = async () => {
  await askQuestion().then(askQuestion).then(askQuestion).then(askExcution);
}

const askExcution = () => {
  rl.question('Are you going to continue? (Yes / No)  ', (answer) => {
    if (answer === 'Yes' || answer === 'yes') {
      excute();
    } else if (answer === 'No' || answer === 'no') {
      rl.close();
      checkGrade(grade);
    } else {
      throw new Error ('It is the wrong answer!');
    }
  });
}
const checkGrade = (grade) => {
  if (grade.korean.length >= 2) {
    calculateGrade('Korean', grade.korean);
  }
  if (grade.math.length >= 2) {
    calculateGrade('Math', grade.math);
  }
  if (grade.english.length >= 2) {
    calculateGrade('English', grade.english);
  }
}

const calculateGrade = (subject, gradeArray) => {
  const gradeProgram = new GradeProgram(gradeArray);
  console.log(`${subject} average : `, gradeProgram.getMean().toFixed(2));
  console.log(`${subject} standard deviation : `, gradeProgram.getStandardDeviation().toFixed(2));
  console.log(`${subject} Z-score 70 : `, gradeProgram.getZscore(70).toFixed(2));
  console.log(`${subject} Z-score 80 : `, gradeProgram.getZscore(80).toFixed(2));
  console.log(`${subject} probability from 70 to 80 : `, gradeProgram.getPercentage(70, 80));
}

excute();
