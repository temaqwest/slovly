<template>
  <slot name="activator" :on="events" :attrs="attributes"></slot>
  <teleport to="body">
    <AppTip :coords="tooltipStyle"/>
  </teleport>
</template>


// Передаём в евентс для слота функцию, которая берёт евент из вставленного в слот элемента и оттуда тягаем таргет
<script lang="ts" setup>
import {ref} from "vue";
import AppTip from "@/components/UI/AppTip.vue"

const attributes = ref()
const events = ref()

const tooltipStyle = ref({
  top: '0',
  left: '0',
  opacity: 0
})

function onMouseOut(e:any) {
  const targetCoords = e.target.getBoundingClientRect()
  console.log('MOUSE DOWN', targetCoords)
  tooltipStyle.value.opacity = 0
}

function onMouseOver(e:any) {
  const targetCoords = e.target.getBoundingClientRect()
  console.log('MOUSE OVER', targetCoords)
  tooltipStyle.value = {
    top: (targetCoords.y + 40) + 'px',
    left: targetCoords.x + 'px',
    opacity: 1
  }
}

events.value = {
  mouseout: onMouseOut,
  mouseover: onMouseOver
}

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
