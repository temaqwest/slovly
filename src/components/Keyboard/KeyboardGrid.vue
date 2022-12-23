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
          class="keyboard__cup"
          :pressed="pressedKey === cup"
          @click="handlePressedKeycup(cup)"
        />
      </div>
      <div class="keyboard__row">
        <KeyboardCup
          long
          class="keyboard__cup"
          letter="backspace"
          :pressed="pressedKey.toLowerCase() === 'backspace'"
          @click="handlePressedKeycup('backspace')"
        >
          <AppIcon name="delete" />
        </KeyboardCup>
        <KeyboardCup
          long
          class="keyboard__cup"
          letter="enter"
          :pressed="pressedKey.toLowerCase() === 'enter'"
          @click="handlePressedKeycup('enter')"
        >
          <AppIcon name="enter" />
        </KeyboardCup>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { localize } from '@/localization/localize'
import KeyboardCup from '@/components/Keyboard/KeyboardCup.vue'
import AppIcon from '@/components/UI/AppIcon.vue'

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
  rawKeyboardLayout.slice(10, 19).split(''),
  rawKeyboardLayout.slice(19, 26).split('')
])

function handlePressedKeycup(key: string) {
  emit('pressed', key)
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
    justify-content: center;
    gap: 8rem;
    width: 100%;
  }
}

@media (max-width: $mobile-m) {
  .keyboard {
    &__row {
      gap: 4rem;
    }

    &__grid {
      gap: 10rem;
    }
  }
}
</style>
