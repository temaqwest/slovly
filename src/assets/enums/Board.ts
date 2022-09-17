export enum LetterSpot {
  none,
  wrong,
  correct
}

export interface LetterSpotStatus {
  isCorrect: boolean
  isWrong: boolean
  isNone: boolean
}
