<template>
  <div class="keyboard">
    <div class="keyboard__grid">
      <div
        class="keyboard__row"
        v-for="(row, idx) in keyboardLayout"
        :key="idx"
      >
        <KeyboardCup
          v-for="cup in row"
          :letter="cup"
          :key="cup"
          @click="handlePressedKeycup(cup)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// interface KeyboardGridProps {}
// interface KeyboardGridEmits {}
//
// const props = defineProps<KeyboardGridProps>()
// const emit = defineEmits<KeyboardGridEmits>()
import { computed, onMounted, onUnmounted } from 'vue'
import { localize } from '@/localization/localize'
import KeyboardCup from '@/components/Keyboard/KeyboardCup.vue'

const keydownListener = (event: KeyboardEvent) => {
  console.log('down')
}
const keyupListener = (event: KeyboardEvent) => {
  console.log('up')
}

const rawKeyboardLayout = localize('Keyboard.layout')
const keyboardLayout = computed(() => [
  rawKeyboardLayout.slice(0, 10).split(''),
  [...rawKeyboardLayout.slice(10, 19).split(''), '×'],
  [...rawKeyboardLayout.slice(19, 26).split(''), '‣']
])

function handlePressedKeycup(key: string) {
  console.log(key)
}

onMounted(() => {
  window.addEventListener('keydown', keydownListener)
  window.addEventListener('keydown', keyupListener)
})

onUnmounted(() => {
  window.removeEventListener('keypress', keydownListener)
  window.removeEventListener('keypress', keyupListener)
})
</script>

<style lang="scss" scoped>
.keyboard {
  margin: 0 auto;
  width: max-content;

  &__grid {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    gap: 8rem;
  }

  &__row {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 8rem;
  }
}
</style>
