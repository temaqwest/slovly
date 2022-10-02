<template>
  <div
    class="game-cell"
    :class="{
      'game-cell--spot-filled': letter !== '',
      'game-cell--spot-correct': spot?.isCorrect,
      'game-cell--spot-contains': spot?.isContains
    }"
  >
    {{ letterOrWhat }}
  </div>
</template>

<script lang="ts" setup>
import { LetterSpotStatus } from '@/assets/enums/Board'
import { computed } from 'vue'

interface IProps {
  letter?: string
  spot?: LetterSpotStatus
}

const props = defineProps<IProps>()

const letterOrWhat = computed(() => {
  return props.letter ? props.letter : ''
})
</script>

<style lang="scss" scoped>
.game-cell {
  width: 55rem;
  height: 55rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35rem;
  font-weight: 900;
  color: $black-color;
  border: 1rem solid $gray-color-4;
  user-select: none;
  text-transform: uppercase;
  transform-style: preserve-3d;
  transition: transform $transition-delay ease-out,
    border-color $transition-delay ease-out,
    background-color $transition-delay-boring ease-out;

  &:hover {
    transform: scale(0.95);
    border-color: $gray-color-3;
  }

  &--spot {
    &-correct {
      border-color: $green-color-2;
      background-color: $green-color-2;
    }

    &-contains {
      border-color: $orange-color-2;
      background-color: $orange-color-2;
    }

    &-correct,
    &-contains {
      color: $color-white;
      animation: rotate-cell $transition-delay-boring ease-out alternate !important;
    }

    &-filled {
      border-color: $gray-color-2;
      animation: twinky-filled $transition-delay - 50
        cubic-bezier(0.21, 0.77, 0.68, 1.6) alternate;
    }
  }
}

@keyframes twinky-filled {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

@keyframes rotate-cell {
  from {
    transform: rotateX(0);
  }
  to {
    transform: rotateX(360deg);
  }
}
</style>
