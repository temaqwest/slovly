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
          :pressed="pressedKey === cup"
          @click="handlePressedKeycup(cup)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { localize } from '@/localization/localize'
import KeyboardCup from '@/components/Keyboard/KeyboardCup.vue'

interface KeyboardGridEmits {
  (e: 'pressed', key: string): void
}

const emit = defineEmits<KeyboardGridEmits>()

const pressedKey = ref<string>('')

const keydownListener = (event: KeyboardEvent) => {
  pressedKey.value = event.key
  emit('pressed', pressedKey.value)
  keyTimeout.value = setTimeout(() => {
    pressedKey.value = ''
  }, 100)
}

const keyTimeout = ref()

const rawKeyboardLayout = localize('Keyboard.layout')
const keyboardLayout = computed(() => [
  rawKeyboardLayout.slice(0, 10).split(''),
  [...rawKeyboardLayout.slice(10, 19).split(''), '×'],
  [...rawKeyboardLayout.slice(19, 26).split(''), '‣']
])

function handlePressedKeycup(key: string) {
  if (key === '×') {
    emit('pressed', 'backspace')
  } else if (key === '‣') {
    emit('pressed', 'enter')
  } else {
    emit('pressed', key)
  }
}

onMounted(() => {
  window.addEventListener('keydown', keydownListener)
})

onUnmounted(() => {
  window.removeEventListener('keypress', keydownListener)
  clearTimeout(keyTimeout.value)
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
