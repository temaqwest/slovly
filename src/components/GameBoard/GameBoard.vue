<template>
  <MessageChip
    v-bind="messageData"
    :visible="isMessageVisible"
    class="message-block--neon"
  />
  <div ref="boardRef" class="board">
    <div
      class="board__row"
      v-for="(row, rowIdx) in wordMatrix"
      :key="rowIdx"
      :data-row-index="rowIdx"
    >
      <GameBoardCell
        class="board__cell"
        :data-cell-index="cellIdx"
        v-for="(cell, cellIdx) in row"
        :key="cellIdx"
        :spot="wordMatrixSpot[rowIdx][cellIdx]"
        :letter="cell"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import GameBoardCell from '@/components/GameBoard/GameBoardCell.vue'
import { GameStates, useGameGrid } from '@/hooks/GameGrid'
import MessageChip from '@/components/MessageChip/MessageChip.vue'
import { localize } from '@/localization/localize'

interface GameBoardProps {
  pressedKey: { key: string }
  wordsPreset: Array<string>
  guessWord: string
}

const props = defineProps<GameBoardProps>()
const boardRef = ref<HTMLDivElement>()

const {
  wordMatrix,
  wordMatrixSpot,
  handleInput,
  gameIsOver,
  message,
  isMessageVisible
} = useGameGrid({
  word: props.guessWord,
  size: {
    maxRows: 6,
    maxCells: 5
  },
  wordsPreset: props.wordsPreset
})

watch(
  () => props.pressedKey,
  () => {
    handleInput(props.pressedKey.key)
  }
)

const messageData = computed(() => {
  const randomNumber = Math.ceil(Math.random() * 3)
  console.log('randomNumber: ', randomNumber)

  if (message.value === GameStates.matched) {
    return {
      icon: 'clap',
      message: localize('GameWords.matched' + randomNumber)
    }
  } else if (message.value === GameStates.notMatched) {
    return {
      icon: 'confused',
      message: localize('GameWords.notMatched' + randomNumber)
    }
  } else if (message.value === GameStates.win) {
    return {
      icon: 'party',
      message: localize('GameWords.win' + randomNumber)
    }
  }

  return {
    icon: 'callme',
    message: localize('GameWords.gameOver' + randomNumber)
  }
})
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
  width: min-content;
  margin: 40rem auto;
  user-select: none;
  position: relative;
  outline: none;

  &__input {
    position: absolute;
    top: -1000;
  }

  &__overlay {
    position: absolute;
    top: -5rem;
    bottom: -5rem;
    left: -5rem;
    right: -5rem;
    backdrop-filter: blur(3rem);
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      .board__overlay-text {
        transform: translateY(-5rem);
        box-shadow: 0 4rem 17rem rgb(0 0 0 / 26%), 0 4rem 17rem rgb(0 0 0 / 33%);
      }
    }

    &-text {
      border-radius: 5rem;
      font-weight: 500;
      background-color: var(--color-white);
      color: var(--black-color);
      font-size: 20rem;
      text-align: center;
      padding: 8rem 30rem;
      box-shadow: 0 3rem 6rem rgb(0 0 0 / 16%), 0 3rem 6rem rgb(0 0 0 / 23%);
      transition: transform $transition-delay-boring ease-in,
        box-shadow $transition-delay-boring ease-in;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 5rem;
    perspective: 600rem;
  }

  &__cell {
  }
}

@media (max-width: $mobile-m) {
  .board {
    margin: 20rem auto 20rem auto;
  }
}

.message-block--neon {
  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(-45deg, #ffeda0 0%, #ffa585 100%);
    transform: translate3d(0px, 20px, 0) scale(0.95);
    filter: blur(30px);
    opacity: 0.7;
    transition: opacity $transition-delay-boring;
    border-radius: inherit;
  }

  &::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    border-radius: inherit;
  }
}
</style>
