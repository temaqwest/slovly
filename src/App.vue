<template>
  <div>
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
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Oswald', sans-serif;
}
</style>
