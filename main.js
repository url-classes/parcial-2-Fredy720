import './style.css'
import { fetchWords, getWord, validateInput } from './words'

// Elementos del DOM
const guessedLettersEl = document.querySelector('.guessed-letters')
const guessedLettersBtn = document.querySelector('.guess')
const letterInput = document.querySelector('.letter')

// 1. En una variable llamada wordInProgress, guardar un elemento de tipo .word-in-progress
const wordInProgress = document.querySelector('.word-in-progress')



const remainingGuessesEl = document.querySelector('.remaining')
const remainingGuessesSpan = document.querySelector('.remaining span')
const message = document.querySelector('.message')
const playAgainButton = document.querySelector('.play-again')

// Propiedades para el juego
let words = []
let guessedLetters = []
let currentWord = 'Random'
let remainingGuesses = 8

init()

// Inicialización del juego
async function init() {
  words = await fetchWords()
  currentWord = getWord(words)
  setPlaceHolder(currentWord)
}

// Funcionalidad del juego
// Muestra una cadena de * por cada letra de la palabra
function setPlaceHolder (word) {
  letterInput.focus()

  const placeholder = new Array(word.length).fill('*')
  wordInProgress.innerText = placeholder.join('')
}

// Permite validar que el input del usuario sea una letra
function guessLetter(letter) {
  // Validate Input retorna un objeto
  // {
  //   valid: true,
  //   error: '',
  // }
  const validation = validateInput(letter)

  // 2. Verificar que la validación se correcta
  if (validation) { //Como ya retorna el valor a la funcion, solo se evalua. 
    makeGuess(letter)
  } else {
    message.innerText = 'ERROR CON CARACTER'
    // 3. Mostrar el mensaje de error en el objeto message
  }
  letterInput.value = ''
}

function makeGuess (guess) {
  const normalizedGuess = guess.toUpperCase()
  if (guessedLetters.includes(normalizedGuess)) {
    message.innerText = 'Ya intentaste con esta letra :/. Intenta con otra.'
  } else {
    guessedLetters.push(normalizedGuess)

    updateRemainingGuesses(normalizedGuess)

    showGuessedLetters()

    updateWordInProgress(guessedLetters)
  }
}

function updateRemainingGuesses(guess) {
  const normalizedWord = currentWord.toUpperCase()

  if (!normalizedWord.includes(guess)) {
    message.innerText = `Hmmm, la palabra no contiene la letra ${guess}.`
    remainingGuesses -= 1;
  } else {
    message.innerText = `¡Bien!, la palabra contiene la letra ${guess}.`
  }

  if (remainingGuesses == 0) {
    message.innerHTML = `Fin del juego. La palabra era <span class="highlight"> ${currentWord} </span>.`
    restart()
  } else if (remainingGuesses === 1) {
    remainingGuessesSpan.innerText = `${remainingGuesses} intento restante.`
  } else {
    remainingGuessesSpan.innerText = `${remainingGuesses} intentos restantes.`
  }
}

function showGuessedLetters() {
  // Clear the list first
  guessedLettersEl.innerHTML = "";

  // Show the guessed letters
  for (const letter of guessedLetters) {
    const li = document.createElement('li')
    li.innerText = letter
    guessedLettersEl.append(li)
  }
}

function updateWordInProgress(guessedLetters) {
  const normalizedWord = currentWord.toUpperCase()
  const placeholder = new Array(normalizedWord.length).fill('*')

  for (let i = 0; i < normalizedWord.length; i++) {
    if (guessedLetters.includes(normalizedWord[i])) {
      placeholder[i] = currentWord[i]
    }
  }

  wordInProgress.innerText = placeholder.join('')
  checkWin()
}

function checkWin() {
  console.log(wordInProgress.innerText)
  if (currentWord === wordInProgress.innerText) {
    message.classList.add('win')
    message.innerHTML = `<p class="highlight">¡Adivinaste la palabra! ¡Felicidades!</p>`
    restart()
  }
}

function restart() {
  letterInput.blur()
  guessedLettersBtn.classList.add('hide')
  remainingGuessesEl.classList.add('hide')
  guessedLettersEl.classList.add('hide')
  playAgainButton.classList.remove('hide')
  playAgainButton.focus()
}

function handleGuess(e) {
  e.preventDefault()

  letterInput.focus()

  message.innerText = ''

  const guess = letterInput.value

  guessLetter(guess)
}

function playAgain(e) {
  message.classList.remove('win')
  // 6. Modificar la función para reiniciar el juego

  remainingGuessesSpan.innerText = `${remainingGuesses} intentos.`
  guessedLettersEl.innerHTML = ''
  message.innerText = ''

  guessedLettersBtn.classList.remove('hide');
  playAgainButton.classList.add('hide');
  remainingGuessesEl.classList.remove('hide');
  guessedLettersEl.classList.remove('hide');
  init();
  guessedLetters = []
  remainingGuesses = 8
  
}

// 4. Agregar un evento 'click' al botón guessedLettersBtn

guessedLettersBtn.addEventListener("click",function(evt){
  handleGuess(evt)
})
// 5. Agregar un evento 'click' al botón playAgainButton
playAgainButton.addEventListener("click",(evt)=>{
  playAgain(evt)
})

