<template>
  <header class="header">
    <div class="header__menu">
      <div class="header__burger">
        <div class="header__burger-line"></div>
        <div class="header__burger-line"></div>
        <div class="header__burger-line"></div>
      </div>
      <nav class="header__nav"></nav>
    </div>
    <div class="header__logo">SLOVLY</div>
    <div class="header__utils">
      <AppTooltip>
        <template v-slot:activator="{on, attrs}">
          <AppIcon class="header__utils-icon" name="settings" v-on="on" v-bind="attrs"/>
        </template>
      </AppTooltip>
      <AppIcon class="header__utils-icon" name="statistic"/>
      <AppIcon class="header__utils-icon" name="help"/>
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppIcon from "@/components/UI/AppIcon.vue";
import AppTooltip from "@/components/UI/AppTooltip.vue"
// interface HeaderProps {
//
// }
//
// interface HeaderEmits {
//
// }
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');
.header {
  font-family: 'Oswald', sans-serif;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  align-items: center;
  min-height: 65px;
  padding: 0 20px;
  border-bottom: 1px solid $gray-color-1;

  &__burger {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 3px;
    cursor: pointer;
    width: min-content;

    &:hover {
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

  &__nav {

  }

  &__menu {
    justify-self: start;
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

    &-icon {
      cursor: pointer;
    }
  }
}

</style>
