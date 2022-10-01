<template>
  <div
    class="key-cup"
    :data-keycode="letter"
    :class="{ 'key-cup--pressed': pressed }"
  >
    {{ letter }}
  </div>
</template>

<script lang="ts" setup>
interface KeyboardCupProps {
  letter: string
  pressed?: boolean
}

withDefaults(defineProps<KeyboardCupProps>(), {
  pressed: false
})
</script>

<style lang="scss" scoped>
.key-cup {
  width: 40rem;
  height: 40rem;
  font-size: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1rem solid $black-color;
  box-shadow: 0 4rem 0 0 $black-color;
  border-radius: 5rem;
  color: $black-color;
  background-color: $color-white;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  transition: all $transition-delay;

  &:hover {
    background-color: $gray-color-6;
  }

  &:active,
  &--pressed {
    -webkit-animation: pulse 0.1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: pulse 0.1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
}

@keyframes pulse {
  to {
    background: rgb(177, 177, 177);
    background: linear-gradient(
      353deg,
      rgba(177, 177, 177, 1) 0%,
      rgba(245, 246, 247, 1) 100%
    );
    transform: translate(0, 0.2em) scale(0.99);
    box-shadow: 0 0 0 0 $black-color;
  }
}
</style>
