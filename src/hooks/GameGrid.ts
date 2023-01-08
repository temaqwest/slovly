import { computed, onMounted, ref } from 'vue'
import { BoardPosition, LetterSpotStatus } from '@/assets/enums/Board'
import { localize } from '@/localization/localize'

type CursorDirection = -1 | 1

export enum GameStates {
  notMatched = 'notMatched',
  matched = 'matched',
  win = 'win',
  gameOver = 'gameOver'
}

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
  const isMessageVisible = ref(false)
  const message = ref('')
  const LETTERS_PRESET = localize('Keyboard.layout').split('')
  const WORDS_PRESET: Array<string> = config.wordsPreset

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
    const isRowFilled = rowWord.length === config.size.maxCells

    if (!isRowFilled) return

    if (checkForFullMatch(rowWord)) return

    if (
      isCursorOnEnd.value &&
      WORDS_PRESET.includes(rowWord) &&
      !alreadyGuessedWords.value.includes(rowWord)
    ) {
      if (!(currentPosition.value.row === config.size.maxRows - 1)) {
        checkIfWordContainsUsefulLetters(rowWord)
        alreadyGuessedWords.value.push(rowWord)
        currentPosition.value.row += 1
        currentPosition.value.cell = 0
        ifWordContainsNeededLetters()
      } else {
        checkIfWordContainsUsefulLetters(rowWord)
        ifWordFullMatched()
      }

      return
    }

    ifWordDoesNotExists()
  }

  function checkIfWordContainsUsefulLetters(word: string) {
    const destWord = config.word.split('')
    const srcWord = word.split('')
    let isAnyMatches = false

    for (let i = 0; i < config.size.maxRows - 1; i++) {
      if (destWord[i] === srcWord[i]) {
        isAnyMatches = true
        wordMatrixSpot.value[currentPosition.value.row][i].isCorrect = true
      } else if (destWord.includes(srcWord[i])) {
        isAnyMatches = true
        wordMatrixSpot.value[currentPosition.value.row][i].isContains = true
      }
    }

    return isAnyMatches
  }

  function checkForFullMatch(word: string): boolean {
    if (config.word === word) {
      checkIfWordContainsUsefulLetters(word)
      gameIsOver.value = true
      message.value = GameStates.win
      isMessageVisible.value = true
      console.log('FULL MATCH, GAME OVER')
      return true
    }

    return false
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

  function ifWordDoesNotExists() {
    isMessageVisible.value = true
    console.log('notMatched')
    message.value = GameStates.notMatched
    setTimeout(() => (isMessageVisible.value = false), 3000)
  }

  function ifWordContainsNeededLetters() {
    isMessageVisible.value = true
    console.log('matched')
    message.value = GameStates.matched
    setTimeout(() => (isMessageVisible.value = false), 3000)
  }

  function ifWordFullMatched() {
    console.log('game over')
    message.value = GameStates.gameOver
    isMessageVisible.value = true
    gameIsOver.value = true
  }

  buildGrid()

  return {
    wordMatrix,
    gameIsOver,
    matchedWord,
    notMatched,
    wordMatrixSpot,
    currentPosition,
    isMessageVisible,
    message,
    handleInput
  }
}
