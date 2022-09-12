<template>
  <header class="header">
    <div class="header__menu">
      <AppButton
        variant="clear"
        class="header__burger"
        :class="{ 'header__burger--active': isMenuVisible }"
        :aria-expanded="isMenuVisible"
        aria-controls="header__list"
        @click="toggleBurgerMenu"
      >
        <div class="header__burger-line"></div>
        <div class="header__burger-line"></div>
        <div class="header__burger-line"></div>
      </AppButton>
      <nav
        class="header__nav"
        :class="{ 'header__nav--active': isMenuVisible }"
      >
        <ul class="header__list">
          <li class="header__list-item">1</li>
          <li class="header__list-item">2</li>
          <li class="header__list-item">3</li>
          <li class="header__list-item">4</li>
          <li class="header__list-item">5</li>
        </ul>
      </nav>
    </div>
    <div class="header__logo">SLOVLY</div>
    <div class="header__utils">
      <AppButton variant="clear">
        <AppIcon class="header__utils-icon" name="settings" />
      </AppButton>
      <AppButton variant="clear">
        <AppIcon class="header__utils-icon" name="statistic" />
      </AppButton>
      <AppButton variant="clear">
        <AppIcon class="header__utils-icon" name="help" />
      </AppButton>
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/UI/AppIcon.vue'
// import AppTooltip from '@/components/UI/AppTooltip.vue'
import AppButton from '@/components/UI/AppButton.vue'
import { ref } from 'vue'

const isMenuVisible = ref<boolean>(false)

function toggleBurgerMenu() {
  isMenuVisible.value = !isMenuVisible.value
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');
.header {
  font-family: 'Oswald', sans-serif;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  align-items: center;
  height: $header-height;
  padding: 0 20px;
  border-bottom: 1px solid $gray-color-1;

  &__burger {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 3px;
    width: min-content;
    transition: all $transition-delay ease-in;

    &--active {
      transform: rotate(45deg);

      & .header__burger-line:first-child {
        transform: translateY(200%) rotate(-90deg);
      }

      & .header__burger-line:nth-child(3) {
        opacity: 0;
      }

      & .header__burger-line:last-child {
        transform: translateY(-200%) rotate(90deg);
      }
    }

    &:hover:not(.header__burger--active) {
      .header__burger-line:first-child {
        transform: translateX(-3px);
      }

      .header__burger-line:last-child {
        transform: translateX(3px);
      }
    }

    &-line {
      background-color: $black-color;
      width: 20px;
      height: 3px;
      border-radius: 3px;
      transition: all $transition-delay ease-in;
    }
  }

  &__menu {
    position: relative;
    justify-self: start;
  }

  &__nav {
    position: fixed;
    top: $header-height;
    bottom: 0;
    left: -30%;
    width: 30%;
    background-color: $color-white;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    visibility: hidden;
    opacity: 0;
    transition: all $transition-delay-boring ease-out;

    &--active {
      visibility: visible;
      opacity: 1;
      left: 0;
    }
  }

  &__list {
    list-style: none;

    &-item {
      padding: 10px 15px;
      width: 100%;
      text-align: left;
      transition: background-color $transition-delay ease-in;
      cursor: pointer;

      &:hover {
        background-color: $gray-color-1;
      }
    }
  }

  &__logo {
    font-size: 36px;
    text-align: center;
    font-weight: 800;
    letter-spacing: -0.1em;
  }

  &__utils {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    justify-self: end;
  }
}
</style>
