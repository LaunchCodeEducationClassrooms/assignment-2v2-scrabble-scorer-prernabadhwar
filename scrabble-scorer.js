// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {

  wordPrompt = input.question("Let's play some scrabble!\n\nEnter a word to score: ");

  while(!/^[a-zA-Z()," "]+$/.test(wordPrompt)) {
    console.log("Invalid input. Try again.");
    wordPrompt = input.question("\nEnter a word to score: ");
  }
  return wordPrompt;
  
};

function simpleScore(word) {
  
  word = word.toUpperCase();
  let score = word.length;
  
  return score;

}

function vowelBonusScore(word) {

  word = word.toUpperCase();
  let score = 0;
  
  for (let i = 0; i < word.length; i++) {
    
    if (word[i] === "A" || word[i] === "E" || word[i] === "I" || word[i] === "O" || word[i] === "U") {
      score += 3;
    
    } else {
    
      score += 1;

    }
  }

  return score;

}

function scrabbleScore(word) {

  word = word.toLowerCase();
  let score = 0;
  
  for (let i=0; i < word.length; i++) {
    score += newPointStructure[word[i]];
  }

  return score;

}

simpleScore = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoreFunction: simpleScore
};

vowelBonusScore = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoreFunction: vowelBonusScore
};

scrabbleScore = {
  name: 'Scrabble',
  description: 'The traditional scoring algorithm.',
  scoreFunction: scrabbleScore
};

const scoringAlgorithms = [simpleScore,vowelBonusScore,scrabbleScore];

function scorerPrompt() {
  
  scorerPrompt = input.question(`\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n\nEnter 0, 1, or 2: `);

  while(!(scorerPrompt === '0' || scorerPrompt === '1' || scorerPrompt === '2')) {
    console.log("Invalid input. Try again.");
    scorerPrompt = input.question(`\nEnter 0, 1, or 2: `);
  }

  return scorerPrompt;

}

let newPointStructure = {};

function transform(pointStructure) {

  for (key in pointStructure) {

    for (let i=0; i < pointStructure[key].length; i++) {
      newPointStructure[pointStructure[key][i].toLowerCase()] = Number(key);
    }
    
    newPointStructure[" "] = 0;
  }

  return newPointStructure;
};


function runProgram() {
  initialPrompt();
  scorerPrompt();
  transform(oldPointStructure);
  console.log(`\nScore for '${wordPrompt}': ${scoringAlgorithms[scorerPrompt].scoreFunction(wordPrompt)}`);
     
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

