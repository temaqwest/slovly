export enum LetterSpot {
  none,
  wrong,
  correct
}

export interface LetterSpotStatus {
  isCorrect: boolean
  isContains: boolean
}

export interface BoardPosition {
  row: number
  cell: number
}
