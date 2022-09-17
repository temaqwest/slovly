<template>
  <button class="app-button" :class="classes" :type="type">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from 'vue'
import {
  ButtonModes,
  ButtonSizes,
  ButtonTypes,
  ButtonVariants
} from '@/assets/enums/Button'

interface IButtonProps {
  type?: ButtonTypes
  variant?: ButtonVariants
  size?: ButtonSizes
  mode?: ButtonModes
}

const props = withDefaults(defineProps<IButtonProps>(), {
  type: ButtonTypes.button,
  variant: ButtonVariants.primary,
  size: ButtonSizes.medium,
  mode: ButtonModes.dark
})

const classes = computed(() => {
  const className = 'app-button'
  const modifiers = ['variant', 'size', 'mode']

  return modifiers.map(
    (mod: string) => `${className}--${mod}-${props[mod as keyof IButtonProps]}`
  )
})
</script>

<style lang="scss" scoped>
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16rem;
  line-height: 1.25;
  letter-spacing: 0.2rem;
  padding: 10rem 24rem;
  border-radius: 8rem;
  position: relative;
  transition: color $transition-delay ease-in-out,
    border $transition-delay ease-in-out,
    background-color $transition-delay ease-in-out;

  &--variant {
    &-clear {
      padding: 0;
      background: transparent;
      border: none;
      border-radius: 0;
    }
  }
  &--mode {
  }
  &--size {
  }
}
</style>
