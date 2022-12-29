<template>
  <div class="app-select" :class="{ 'app-select--expanded': isExpanded }">
    <div
      class="app-select__visible"
      @click="toggleSelect"
      v-click-outside="handleClickOutside"
    >
      <span class="app-select__placeholder">
        {{ modelValue?.title ?? localize('Base.notSelected') }}
      </span>
      <AppButton type="button" variant="clear">
        <AppIcon name="arrow" class="app-select__icon" />
      </AppButton>
    </div>
    <div class="app-select__options">
      <div
        class="app-select__option"
        v-for="(option, idx) in items"
        :key="`${option.title}_${idx}`"
        @click="handleSelectOption(option)"
      >
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults } from 'vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppIcon from '@/components/UI/AppIcon.vue'
import { localize } from '@/localization/localize'
import { SelectOption } from '@/assets/interfaces/BaseInterfaces'

interface AppSelectEmits {
  (e: 'update:modelValue', value: any): void
}

interface AppSelectProps {
  items: Array<SelectOption>
  modelValue: SelectOption | null
}

const emit = defineEmits<AppSelectEmits>()
const props = withDefaults(defineProps<AppSelectProps>(), {
  items: () => []
})

const isExpanded = ref(false)

function handleClickOutside(e: any) {
  isExpanded.value = false
}

function handleSelectOption(option: SelectOption) {
  emit('update:modelValue', option)
  toggleSelect()
}

function toggleSelect() {
  isExpanded.value = !isExpanded.value
}
</script>

<style lang="scss" scoped>
.app-select {
  position: relative;
  min-width: 180rem;
  height: 35rem;
  color: var(--black-color);

  &:hover:not(.app-select--expanded) {
    .app-select__icon {
      color: var(--black-color);
    }

    .app-select__visible {
      border-color: var(--black-color);
    }
  }

  &--expanded {
    .app-select__visible,
    .app-select__options {
      border-color: $orange-color-1;
    }

    .app-select__options {
      opacity: 1;
      visibility: visible;
    }

    .app-select__icon {
      transform: rotate(0);
      color: $orange-color-1;
    }
  }

  &__visible {
    background-color: var(--color-white);
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 10rem;
    border: 1rem solid $gray-color-4;
    border-radius: 8rem;
    transition: border-color $transition-delay ease-in-out;
  }

  &__icon {
    color: $gray-color-4;
    transition: transform $transition-delay ease-in-out,
      color $transition-delay ease-in-out;
    transform: rotate(180deg);
  }

  &__placeholder {
    user-select: none;
  }

  &__options {
    width: 100%;
    z-index: 1;
    visibility: hidden;
    opacity: 0;
    background-color: var(--color-white);
    position: absolute;
    top: 40rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    gap: 5rem;
    padding: 5rem 10rem;
    border: 1rem solid var(--black-color);
    border-radius: 8rem;
    transition: all $transition-delay ease-in-out;
  }

  &__option {
    cursor: pointer;
    color: var(--black-color);
    width: 100%;
    transition: color $transition-delay ease;
    user-select: none;

    &:hover {
      color: $orange-color-1;
    }
  }

  &__icon {
  }
}
</style>
