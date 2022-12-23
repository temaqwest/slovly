<template>
  <div class="help-dialog__content">
    <div class="help-dialog__block">
      <p class="help-dialog__text">
        Guess the <strong>SLOVLY</strong> in 6 tries.
      </p>
      <p class="help-dialog__text">
        Each guess must be a valid 5-letter word. Hit the enter button to
        submit. Also you can use our virtual keyboard.
      </p>
      <p class="help-dialog__text">
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
      </p>
    </div>
    <div class="help-dialog__divider" />
    <div class="help-dialog__block">
      <h2 class="help-dialog__title">Examples</h2>
      <div class="help-dialog__word">
        <GameBoardCell
          class="help-dialog__word-cell"
          :data-cell-index="cellIdx"
          v-for="(cell, cellIdx) in wordOne"
          :key="cellIdx"
          :spot="wordOneSpot[cellIdx]"
          :letter="cell"
        />
      </div>
      <p class="help-dialog__text">
        The letter <strong>«L»</strong> is in the word and in incorrect spot.
        That's why it is colored orange.
      </p>
    </div>
    <div class="help-dialog__block">
      <div class="help-dialog__word">
        <GameBoardCell
          class="help-dialog__word-cell"
          :data-cell-index="cellIdx"
          v-for="(cell, cellIdx) in wordTwo"
          :key="cellIdx"
          :spot="wordTwoSpot[cellIdx]"
          :letter="cell"
        />
      </div>
      <p class="help-dialog__text">
        The letter <strong>«M»</strong> is in the word and in correct spot.
        That's why it is colored green.
      </p>
    </div>
    <div class="help-dialog__block">
      <div class="help-dialog__word">
        <GameBoardCell
          class="help-dialog__word-cell"
          :data-cell-index="cellIdx"
          v-for="(cell, cellIdx) in wordThree"
          :key="cellIdx"
          :spot="wordThreeSpot[cellIdx]"
          :letter="cell"
        />
      </div>
      <p class="help-dialog__text">
        There are no letters that are contained in the word
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import GameBoardCell from '@/components/GameBoard/GameBoardCell.vue'
// interface IProps {}
// interface IEmits {}
//
// const props = defineProps<IProps>()
// const emit = defineEmits<IEmits>()

import { ref } from 'vue'
import { LetterSpotStatus } from '@/assets/enums/Board'

const wordOne = ref<Array<string>>(['a', 'l', 'e', 'r', 't'])
const wordOneSpot = ref<Array<LetterSpotStatus>>([
  { isContains: false, isCorrect: false },
  { isContains: true, isCorrect: false },
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false }
])
const wordTwo = ref<Array<string>>(['l', 'i', 'g', 'm', 'a'])
const wordTwoSpot = ref<Array<LetterSpotStatus>>([
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: true },
  { isContains: false, isCorrect: false }
])
const wordThree = ref<Array<string>>(['l', 'i', 'n', 'k', 's'])
const wordThreeSpot = ref<Array<LetterSpotStatus>>([
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false },
  { isContains: false, isCorrect: false }
])
</script>

<style lang="scss" scoped>
.help-dialog {
  &__content {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 0 20rem 20rem 20rem;
  }

  &__text {
    font-size: 16rem;
    line-height: 130%;
    margin-bottom: 8rem;
    color: var(--black-color);

    &--bold {
      font-weight: bold;
    }
  }

  &__title {
    font-size: 19rem;
    font-weight: 400;
    text-align: left;
    color: var(--black-color);
  }

  &__divider {
    height: 1rem;
    width: 100%;
    background-color: $gray-color-4;
    margin: 10rem 0;
  }

  &__word {
    display: flex;
    align-items: center;
    gap: 5rem;
    margin: 10rem 0;
  }
}
</style>
