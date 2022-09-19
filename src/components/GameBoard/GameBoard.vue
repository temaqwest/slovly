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

const currentPosition = ref<any>({ row: 0, cell: 0 })
const wordMatrix = ref<Array<Array<string>>>([
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
])
const lettersPreset = 'abcdefghijklmnopqrstuvwxyz'

function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'Backspace') {
    if (currentPosition.value.cell === 0 && currentPosition.value.row === 0)
      return false

    if (currentPosition.value.cell === -1) {
      currentPosition.value.row -= 1
      currentPosition.value.cell = 4
    } else {
      currentPosition.value.cell -= 1
      wordMatrix.value[currentPosition.value.row][currentPosition.value.cell] =
        ''
    }
    return false
  } else {
    if (currentPosition.value.row === 5) {
      console.log('Переполнено')
      return false
    }
    if (lettersPreset.includes(e.key.toLowerCase())) {
      console.log('keydown:', e)
      wordMatrix.value[currentPosition.value.row][currentPosition.value.cell] =
        e.key

      if (currentPosition.value.row === 4 && currentPosition.value.cell === 4) {
        return
      } else {
        currentPosition.value.cell += 1

        if (currentPosition.value.cell >= 5) {
          currentPosition.value.row += 1
          currentPosition.value.cell = 0
        }
      }
    }
  }
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
