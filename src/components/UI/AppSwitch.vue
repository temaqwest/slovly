<template>
  <label class="app-switch">
    <input
      type="checkbox"
      class="app-switch__native"
      :checked="modelValue"
      @input="toggleData"
    />
    <span class="app-switch__marker"></span>
  </label>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue'

interface AppSwitchProps {
  modelValue: boolean
}

interface AppSwitchEmits {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<AppSwitchProps>(), {})
const emit = defineEmits<AppSwitchEmits>()

function toggleData(e: InputEvent) {
  const isChecked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', isChecked)
}
</script>

<style lang="scss" scoped>
.app-switch {
  width: 46rem;
  height: 27rem;
  border: 1rem solid $gray-color-4;
  border-radius: 15rem;
  background-color: var(--color-white);
  position: relative;
  cursor: pointer;
  transition: border-color $transition-delay ease-in-out;

  &:hover {
    border-color: var(--black-color);
    .app-switch__marker {
      background-color: var(--black-color);
    }
  }

  &__marker {
    position: absolute;
    width: 21rem;
    height: 21rem;
    top: 2rem;
    left: 0;
    transform: translateX(2rem);
    background-color: $gray-color-3;
    border-radius: 100%;
    transition: all $transition-delay ease-in-out;
  }

  .app-switch__native {
    appearance: none;
    opacity: 0;

    &:checked + .app-switch__marker {
      background-color: $orange-color-1;
      transform: translateX(100%);
    }
  }
}
</style>
