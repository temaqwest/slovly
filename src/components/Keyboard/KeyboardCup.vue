<template>
  <div
    v-if="!$slots.default"
    class="key-cup"
    :data-keycode="letter"
    :class="{ 'key-cup--pressed': pressed, 'key-cup--long': long }"
  >
    {{ letter }}
  </div>
  <div
    v-else
    class="key-cup"
    :data-keycode="letter"
    :class="{ 'key-cup--pressed': pressed, 'key-cup--long': long }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
interface KeyboardCupProps {
  letter: string
  long?: boolean
  pressed?: boolean
}

withDefaults(defineProps<KeyboardCupProps>(), {
  pressed: false,
  long: false
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
  border: 1rem solid var(--black-color);
  box-shadow: 0 4rem 0 0 var(--black-color);
  border-radius: 5rem;
  color: var(--black-color);
  background-color: var(--color-white);
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
  transition: all $transition-delay;

  &--long {
    flex-grow: 1;
    max-width: 100rem;
  }

  &:hover {
    background-color: var(--keycup--hover);
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
      rgba(245, 246, 247, 0.1) 100%
    );
    transform: translate(0, 0.2em) scale(0.99);
    box-shadow: 0 0 0 0 var(--black-color);
  }
}

@media (max-width: $mobile-m) {
  .key-cup {
    width: 32rem;
    height: 40rem;
    font-size: 22rem;
    border-radius: 3rem;
    box-shadow: none;
  }
}
</style>
