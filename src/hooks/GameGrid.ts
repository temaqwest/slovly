import { computed, ref } from 'vue'
import { BoardPosition } from '@/assets/enums/Board'

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
  const currentPosition = ref<BoardPosition>({ row: 0, cell: 0 })

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

  function handleInput(e: KeyboardEvent) {
    const normalizedKey = e.key.toLowerCase()

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

    if (isCursorOnEnd.value && config.wordsPreset.includes(rowWord)) {
      console.log('Match word')
    }
  }

  function buildGrid() {
    for (let i = 0; i < config.size.maxRows; i++) {
      const currentRow: Array<string> = []
      for (let j = 0; j < config.size.maxCells; j++) {
        currentRow.push('')
      }
      wordMatrix.value.push(currentRow)
    }
  }

  buildGrid()

  return {
    wordMatrix,
    currentPosition,
    handleInput
  }
}
