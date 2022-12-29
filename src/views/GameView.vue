<template>
  <div class="game-view">
    <GameBoard
      v-if="loaded"
      :pressed-key="pressedKey"
      :words-preset="dictionary"
      :guess-word="wordToGuess"
    />
    <KeyboardGrid @pressed="passPressedKeyToGameBoard" />
  </div>
</template>

<script lang="ts" setup>
import GameBoard from '@/components/GameBoard/GameBoard.vue'
import KeyboardGrid from '@/components/Keyboard/KeyboardGrid.vue'
import { onMounted, ref } from 'vue'
import getDictionaryBySelectedLanguage from '@/utils/getDictionaryBySelectedLanguage'
import getRandomWordFromDictionary from '@/utils/getRandomWordFromDictionary'

const pressedKey = ref<{ key: string }>({ key: '' })

function passPressedKeyToGameBoard(key: string) {
  pressedKey.value = { key }
}

const dictionary = ref<Array<string>>([])
const wordToGuess = ref<string>('')
const loaded = ref(false)

onMounted(async () => {
  dictionary.value = await getDictionaryBySelectedLanguage()
  wordToGuess.value = await getRandomWordFromDictionary()
  loaded.value = true
})
</script>

<style lang="scss" scoped></style>
