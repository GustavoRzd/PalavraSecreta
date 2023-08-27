import words from './data/words'

//CSS
import './App.css';

//React
import { useState, useCallback, useEffect } from 'react';

//data
import { wordsList } from './data/words';

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1 , name: "Start"},
  {id: 2 , name: "Game"},
  {id: 3 , name: "End"},
];

function App() {

  const [gameStage, setGameStage] = useState (stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState(" ");
  const [pickedCategory, setPickedCategory] = useState(" ");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() =>{
    //pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    console.log(category);

    //pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    console.log(word);

    return{word, category};
  }, [words]);

//Iniciando o jogo Palavra Secreta
const startGame = useCallback(() =>{

  clearLetterStates();
 // pick word and pick category
 const {word, category} = pickWordAndCategory();

 //create array of letters

  let wordLetters = word.split("");

  wordLetters = wordLetters.map((l) => l.toLowerCase());


  console.log(word,category);
  console.log(wordLetters);

//fill states
setPickedWord(word);
setPickedCategory(category);
setLetters(wordLetters);

  setGameStage(stages[1].name);
}, [pickWordAndCategory]);

//Processo das letras

const verifyLetter = (letter) => {
  const normalizedLetter = letter.toLowerCase()
  
  //check if letter has already been utilized

  if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
    return;
  }
  // push guessed letter or remove a guess
  if(letters.includes(normalizedLetter)){
    setGuessedLetters((actualGuessedLetters)=>[
      ...actualGuessedLetters, normalizedLetter
    ])
  } else {
    setWrongLetters((actualWrongLetters)=>[
      ...actualWrongLetters, normalizedLetter
    ]);

    setGuesses((actualGuesses) => actualGuesses - 1);
  }

  };

    const clearLetterStates = () => {
      setGuessedLetters([])
      setWrongLetters([])
    };


  useEffect(() => {
      if(guesses <= 0){
        //reset all states
        clearLetterStates();
        

        setGameStage(stages[2].name)
      }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters = [... new Set(letters)];

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100)

      startGame();
    }

    console.log(uniqueLetters);

  }, [guessedLetters, letters, startGame])


const retry = () => {
  setScore(0);
  setGuesses(3);

  setGameStage(stages[0].name)
}

return ( <div className="App">
   
      {gameStage === 'Start' && <StartScreen startGame={startGame} />}
      {gameStage === 'Game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory = {pickedCategory} letters = {letters} guessedLetters = {guessedLetters} wrongLetters = {wrongLetters} guesses = {guesses} score = {score} />}
      {gameStage === 'End' && <GameOver retry={retry} score = {score} />}


      </div>);
}

export default App;
