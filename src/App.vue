<template>
  <div :class="appTheme" class="app-bg">
    <TheHeader />
    <!--  <nav>-->
    <!--    <router-link to="/">Home</router-link> |-->
    <!--    <router-link to="/about">About</router-link>-->
    <!--  </nav>-->
    <router-view />
    <div class="dialogs" id="dialogs"></div>
    <div class="tooltips" id="tooltips"></div>
  </div>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/TheHeader.vue'
import { useMainStore } from '@/store/mainStore'
import { computed } from 'vue'
import { Theme } from '@/assets/enums/Theme'

const mainStore = useMainStore()

const appTheme = computed(() =>
  mainStore.getCurrentTheme === Theme.black ? 'theme--black' : 'theme--light'
)
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Oswald', sans-serif;
}

.app-bg {
  background-color: var(--color-white);
  min-height: 100vh;
}
</style>
