<template>
  <svg class="icon" :style="iconStyle">
    <use :xlink:href="iconPath" />
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import * as Sprite from '../../assets/svg/sprite.svg'

export default defineComponent({
  name: 'AppIcon',
  props: {
    name: {
      required: true,
      type: String
    },
    iconWidth: {
      required: false,
      type: String
    },
    iconHeight: {
      required: false,
      type: String
    },
    iconColor: {
      required: false,
      type: String
    }
  },

  setup(props) {
    const iconPath = computed(() => Sprite.default + '#' + props.name)
    const iconStyle = computed(() => ({
      width: props.iconWidth,
      height: props.iconHeight,
      color: props.iconColor
    }))

    return {
      iconPath,
      iconStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  flex: none;
  width: 24px;
  height: 24px;
}
</style>
