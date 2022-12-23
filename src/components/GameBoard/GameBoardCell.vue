<template>
  <div
    class="game-cell"
    :class="{
      'game-cell--spot-filled': letter !== '',
      'game-cell--spot-correct': spot?.isCorrect,
      'game-cell--spot-contains': spot?.isContains,
      'game-cell--clicked': isClicked
    }"
    @click="onClick"
    @animationend="onAnimationEnd"
  >
    {{ letterOrWhat }}
  </div>
</template>

<script lang="ts" setup>
import { LetterSpotStatus } from '@/assets/enums/Board'
import { computed, ref } from 'vue'

interface IProps {
  letter?: string
  spot?: LetterSpotStatus
}

const props = defineProps<IProps>()

const letterOrWhat = computed(() => {
  return props.letter ? props.letter : ''
})

const isClicked = ref<boolean>(false)

function onClick() {
  isClicked.value = true
}

function onAnimationEnd() {
  isClicked.value = false
}
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
  color: var(--black-color);
  border: 1rem solid $gray-color-4;
  user-select: none;
  text-transform: uppercase;
  transform-style: preserve-3d;
  transition: transform $transition-delay ease-out,
    border-color $transition-delay ease-out,
    background-color $transition-delay-boring ease-out;

  &:hover {
    border-color: $gray-color-3;
  }

  &--clicked {
    animation: cell-clicked $transition-delay-boring ease-out alternate !important;
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

    &-filled {
      border-color: $gray-color-2;
      animation: twinky-filled $transition-delay - 50
        cubic-bezier(0.21, 0.77, 0.68, 1.6) alternate;
    }

    &-correct,
    &-contains {
      color: var(--color-white);
      animation: rotate-cell $transition-delay-boring ease-out alternate;
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

@keyframes cell-clicked {
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(360deg);
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

@media (max-width: $mobile-m) {
  .game-cell {
    width: 50px;
    height: 50px;
  }
}
</style>
