<template>
  <header class="header">
    <div class="header__menu">
      <AppButton
        variant="clear"
        class="header__burger"
        :class="{ 'header__burger--active': isMenuVisible }"
        :aria-expanded="isMenuVisible"
        aria-controls="header__list"
        @click.stop="toggleBurgerMenu"
      >
        <div class="header__burger-line"></div>
        <div class="header__burger-line"></div>
        <div class="header__burger-line"></div>
      </AppButton>
      <nav
        class="header__nav"
        :class="{ 'header__nav--active': isMenuVisible }"
        v-click-outside="handleIt"
      >
        <ul class="header__list" tabindex="1">
          <li
            class="header__list-item"
            v-for="idx in 5"
            :key="idx"
            tabindex="0"
            role="button"
          >
            Menu item {{ idx }}
          </li>
        </ul>
      </nav>
      <Transition name="overlay-fade">
        <div class="header__menu-overlay" v-show="isMenuVisible"></div>
      </Transition>
    </div>
    <div class="header__logo">{{ localize('Header.appName') }}</div>
    <div class="header__utils">
      <AppButton variant="clear" :title="localize('Header.settings')">
        <AppIcon class="header__utils-icon" name="settings" />
      </AppButton>
      <AppButton variant="clear" :title="localize('Header.statistic')">
        <AppIcon class="header__utils-icon" name="statistic" />
      </AppButton>
      <AppButton variant="clear" :title="localize('Header.help')">
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
import { localize } from '@/localization/localize'

const isMenuVisible = ref<boolean>(false)

function toggleBurgerMenu() {
  isMenuVisible.value = !isMenuVisible.value
}

function handleIt(e: any) {
  if (isMenuVisible.value) {
    isMenuVisible.value = false
  }
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
  padding: 0 20rem;
  border-bottom: 1rem solid $gray-color-1;

  &__burger {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 3rem;
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
        transform: translateX(-3rem);
      }

      .header__burger-line:last-child {
        transform: translateX(3rem);
      }
    }

    &-line {
      background-color: $black-color;
      width: 20rem;
      height: 3rem;
      border-radius: 3rem;
      transition: all $transition-delay ease-in;
    }
  }

  &__menu {
    position: relative;
    justify-self: start;
  }

  &__menu-overlay {
    position: fixed;
    top: $header-height;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    backdrop-filter: blur(3rem);
    cursor: pointer;
  }

  &__nav {
    position: fixed;
    top: $header-height;
    bottom: 0;
    left: -30%;
    width: 30%;
    background-color: $color-white;
    box-shadow: 0 3rem 6rem rgb(0 0 0 / 16%), 0 3rem 6rem rgb(0 0 0 / 23%);
    visibility: hidden;
    opacity: 0;
    transition: all $transition-delay-boring ease-out;
    z-index: 11;

    &--active {
      visibility: visible;
      opacity: 1;
      left: 0;
    }
  }

  &__list {
    list-style: none;
    user-select: none;

    &-item {
      padding: 10rem 15rem;
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
    font-size: 36rem;
    text-align: center;
    font-weight: 800;
    letter-spacing: -0.13em;
    user-select: none;
    transition: all 0.5s ease-in-out;

    @media (pointer: fine) and (hover: hover) {
      &:hover {
        animation: smash-letters 2000ms cubic-bezier(0.06, 0.78, 0.07, 1.67)
          1.5s;
      }
    }
  }

  &__utils {
    display: inline-flex;
    align-items: center;
    gap: 5rem;
    justify-self: end;
  }
}

@keyframes smash-letters {
  0% {
    letter-spacing: -0.13em;
  }
  60% {
    letter-spacing: 0.4em;
  }
  70% {
    letter-spacing: -0.15em;
  }
  100% {
    letter-spacing: -0.13em;
  }
}
</style>
