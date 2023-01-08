<template>
  <div class="message-chip" :class="{ 'message-chip--visible': visible }">
    <AppIcon :name="icon" class="message-chip__icon" />
    <span class="message-chip__text"> {{ message }}</span>
  </div>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/UI/AppIcon.vue'

interface MessageChipProps {
  message: string
  icon: string
  visible: boolean
}

const props = defineProps<MessageChipProps>()
</script>

<style lang="scss" scoped>
.message-chip {
  display: inline-flex;
  align-items: center;
  gap: 15rem;
  padding: 15rem;
  background-color: var(--color-white);
  border: 1rem solid $gray-color-4;
  border-radius: 8rem;
  position: fixed;
  top: -50%;
  left: 50%;
  opacity: 0;
  transform: translateX(-50%);
  transition: all $transition-delay-boring ease-in-out;
  z-index: 10;

  &--visible {
    opacity: 1;
    transform: translateX(-50%);
    top: 5%;
  }

  &__icon {
    width: 40rem;
    height: 40rem;
  }

  &__text {
    color: var(--black-color);
    font-size: 18rem;
    user-select: none;
  }
}
</style>
