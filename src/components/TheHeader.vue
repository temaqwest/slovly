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
      <AppIcon class="header__utils-icon" name="settings"/>
      <AppIcon class="header__utils-icon" name="statistic"/>
      <AppIcon class="header__utils-icon" name="help"/>
    </div>
  </header>
</template>

<script lang="ts" setup>
import AppIcon from "@/components/UI/AppIcon.vue";
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
  border-bottom: 1px solid #d3d6da;

  &__burger {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 3px;
    cursor: pointer;
    width: min-content;

    &-line {
      background-color: $black-color;
      width: 20px;
      height: 3px;
      border-radius: 3px;
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
