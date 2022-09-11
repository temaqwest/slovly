<template>
  <TheHeader/>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </nav>-->
  <router-view/>
  <div class="modals" id="modals"></div>
  <div class="tooltips" id="tooltips"></div>
</template>

<script lang="ts" setup>
import TheHeader from "@/components/TheHeader.vue"
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Oswald', sans-serif;
}

</style>
