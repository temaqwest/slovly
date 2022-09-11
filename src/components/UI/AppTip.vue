<template>
  <div class="app-tooltip" :style="coords">
    tooltip
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from "vue";

interface IProps {
  coords: any
}

const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>
.app-tooltip {
  position: absolute;
  min-height: 30px;
  background-color: black;
  color: white;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity $transition-delay ease-in;
}
</style>
