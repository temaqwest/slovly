<template>
  <div
    ref="boardRef"
    class="board"
    tabindex="0"
    @keydown="handleKeydown"
    @focusin="handleBoardFocusIn"
    @blur="handleBoardBlur"
  >
    <Transition name="overlay-fade">
      <div class="board__overlay" v-if="!isBoardFocused">
        <div class="board__overlay-text">Click to focus</div>
      </div>
    </Transition>
    <div class="board__row" v-for="(row, rowIdx) in wordMatrix" :key="rowIdx">
      <GameBoardCell
        class="board__cell"
        v-for="(cell, cellIdx) in row"
        :key="cellIdx"
        :letter="cell"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GameBoardCell from '@/components/GameBoard/GameBoardCell.vue'

const boardRef = ref<HTMLDivElement>()
const isBoardFocused = ref<boolean>(false)

const wordMatrix = ref<Array<Array<string>>>(Array(6).fill(Array(5).fill('')))

function handleKeydown(e: any) {
  console.log('keydown:', e)
}

function handleBoardBlur(e: any) {
  isBoardFocused.value = false
  console.log('Blur: ', e)
}

function handleBoardFocusIn(e: any) {
  isBoardFocused.value = true
  console.log('Focus in: ', e)
}
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
      background-color: $color-white;
      color: $black-color;
      font-size: 20rem;
      text-align: center;
      padding: 8px 30px;
      box-shadow: 0 3rem 6rem rgb(0 0 0 / 16%), 0 3rem 6rem rgb(0 0 0 / 23%);
      transition: transform $transition-delay-boring ease-in,
        box-shadow $transition-delay-boring ease-in;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 5rem;
  }

  &__cell {
  }
}
</style>
