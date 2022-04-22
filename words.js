export async function fetchWords(defaultWords = []) {
  const response = await fetch('https://gist.githubusercontent.com/redrambles/c72ae70504e304519b0e187b0f3dc1a4/raw/72db8cf89b7f5e6f804527c879e800bd6fb0d93c/words.txt')

  if (!response.ok) {
    console.log('response failed - using default words')
    return defaultWords
  } 

  const fileData = await response.text()
  const words = fileData.split('\n')
  return words
}

export function getWord(words=[], placeholder='') {
  const index = Math.floor(Math.random() * words.length)
  const word = words[index].trim()

  if (word.length > 10) {
    return getWord(words, placeholder)
  }
  return words[index]
}

export function validateInput (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    // Is the input empty?
    return {
      valid: false,
      error: 'Por favor usa una letra'
    }
  } else if (input.length > 1) {
    // Did you type more than one letter?
    return {
      valid: false, 
      error: 'Por favor usa solo una letra por vez.'
    }
  } else if (!input.match(acceptedLetter)) {
    // Did you type a number, a special character or some other non letter thing?
    return {
      valid: false,
      error: 'Por favor usa un caracter de la A a la Z.'
    }
  } else {
    // We finally got a single letter, omg yay
    return {
      valid: true
    };
  }
};
