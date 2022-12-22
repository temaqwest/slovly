import { computed, ref } from 'vue'
import { BoardPosition, LetterSpotStatus } from '@/assets/enums/Board'

const LETTERS_PRESET = 'abcdefghijklmnopqrstuvwxyz'.split('')

type CursorDirection = -1 | 1

export interface GameGridConfig {
  word: string
  size: {
    maxRows: number
    maxCells: number
  }
  wordsPreset: Array<string>
}

export function useGameGrid(config: GameGridConfig) {
  const wordMatrix = ref<Array<Array<string>>>([])
  const wordMatrixSpot = ref<Array<Array<LetterSpotStatus>>>([])
  const currentPosition = ref<BoardPosition>({ row: 0, cell: 0 })
  const alreadyGuessedWords = ref<Array<string>>([])
  const gameIsOver = ref(false)
  const matchedWord = ref(false)
  const notMatched = ref(false)

  const isCursorOnStart = computed(() => currentPosition.value.cell === 0)
  const isCursorOnEnd = computed(
    () => currentPosition.value.cell === config.size.maxCells - 1
  )

  const isCurrentCellEmpty = computed(
    () =>
      wordMatrix.value[currentPosition.value.row][
        currentPosition.value.cell
      ] === ''
  )

  function setCurrentLetter(letter = '') {
    wordMatrix.value[currentPosition.value.row][currentPosition.value.cell] =
      letter
  }

  function moveCursor(flag: CursorDirection) {
    flag === -1
      ? (currentPosition.value.cell -= 1)
      : (currentPosition.value.cell += 1)
  }

  function handleInput(key: string) {
    if (gameIsOver.value) return false
    const normalizedKey = key.toLowerCase()

    if (LETTERS_PRESET.includes(normalizedKey)) {
      handleLettersInput(normalizedKey)
    } else if (normalizedKey === 'backspace') {
      handleBackspacePress()
    } else if (normalizedKey === 'enter') {
      handleWordAccept()
    }
  }

  function handleBackspacePress() {
    if (isCursorOnStart.value) {
      wordMatrix.value[currentPosition.value.row][currentPosition.value.cell] =
        ''
      return false
    }

    if (isCurrentCellEmpty.value) {
      moveCursor(-1)
      setCurrentLetter()
    } else {
      setCurrentLetter()
      moveCursor(-1)
    }
  }

  function handleLettersInput(letter: string) {
    if (isCursorOnEnd.value) {
      wordMatrix.value[currentPosition.value.row][currentPosition.value.cell] =
        letter
      return false
    }

    if (!isCurrentCellEmpty.value) {
      moveCursor(1)
      wordMatrix.value[currentPosition.value.row][currentPosition.value.cell] =
        letter
    } else {
      wordMatrix.value[currentPosition.value.row][currentPosition.value.cell] =
        letter
      moveCursor(1)
    }
  }

  function handleWordAccept() {
    const rowWord = wordMatrix.value[currentPosition.value.row].join('')

    checkForFullMatch(rowWord)

    if (
      isCursorOnEnd.value &&
      config.wordsPreset.includes(rowWord) &&
      !alreadyGuessedWords.value.includes(rowWord)
    ) {
      if (!(currentPosition.value.row === config.size.maxRows - 1)) {
        checkIfWordContainsUsefulLetters(rowWord)
        alreadyGuessedWords.value.push(rowWord)
        currentPosition.value.row += 1
        currentPosition.value.cell = 0
        console.log('match word')
        matchedWord.value = true
        setTimeout(() => (matchedWord.value = false), 1000)
      } else {
        checkIfWordContainsUsefulLetters(rowWord)
        gameIsOver.value = true
        console.log('Game Over')
      }
    }
  }

  function checkIfWordContainsUsefulLetters(word: string) {
    const destWord = config.word.split('')
    const srcWord = word.split('')

    for (let i = 0; i < config.size.maxRows - 1; i++) {
      if (destWord[i] === srcWord[i]) {
        wordMatrixSpot.value[currentPosition.value.row][i].isCorrect = true
      } else if (destWord.includes(srcWord[i])) {
        wordMatrixSpot.value[currentPosition.value.row][i].isContains = true
      }
    }
  }

  function checkForFullMatch(word: string) {
    if (config.word === word) {
      checkIfWordContainsUsefulLetters(word)
      gameIsOver.value = true
      console.log('FULL MATCH, GAME OVER')
    }
  }

  function buildGrid() {
    for (let i = 0; i < config.size.maxRows; i++) {
      const currentRow: Array<string> = []
      const currentSpotRow: Array<LetterSpotStatus> = []

      for (let j = 0; j < config.size.maxCells; j++) {
        currentRow.push('')
        currentSpotRow.push({ isCorrect: false, isContains: false })
      }

      wordMatrixSpot.value.push(currentSpotRow)
      wordMatrix.value.push(currentRow)
    }
  }

  buildGrid()

  return {
    wordMatrix,
    gameIsOver,
    matchedWord,
    wordMatrixSpot,
    currentPosition,
    handleInput
  }
}
