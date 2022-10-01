<template>
  <div class="game-view">
    <GameBoard :pressed-key="pressedKey" />
    <KeyboardGrid @pressed="handlePressedKey" />
  </div>
</template>

<script lang="ts" setup>
import GameBoard from '@/components/GameBoard/GameBoard'
import KeyboardGrid from '@/components/Keyboard/KeyboardGrid.vue'
import { ref } from 'vue'

const pressedKey = ref<{ key: string }>({ key: '' })

function handlePressedKey(key: string) {
  pressedKey.value = { key }
}
</script>

<style lang="scss" scoped></style>
