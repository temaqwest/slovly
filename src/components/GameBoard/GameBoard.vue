<template>
  <div class="board">
    <div class="board__row">
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
    </div>
    <div class="board__row">
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
    </div>
    <div class="board__row">
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
    </div>
    <div class="board__row">
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
    </div>
    <div class="board__row">
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
    </div>
    <div class="board__row">
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
      <div class="board__cell"></div>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 5px;

  .board__row {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .board__cell {
    width: 65px;
    height: 65px;
    border: 1px solid #d3d6da;
  }
}
</style>
