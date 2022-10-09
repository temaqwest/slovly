<template>
  <div class="tooltip" :class="{ 'tooltip--active': isMouseOver && !isHidden }">
    <slot :on="events" :attrs="attrs" name="activator" />
    <div :class="tipStyleClasses" ref="tipRef">
      <div class="tooltip__tip-arrow" v-if="arrow" />
      <span class="tooltip__tip-text">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, watch, withDefaults, defineProps } from 'vue'
type TooltipDirections = 'bottom' | 'top' | 'left' | 'right'
interface IProps {
  text: string
  dir?: TooltipDirections
  offset?: string | number
  arrow?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  dir: 'bottom',
  offset: '0',
  arrow: true
})

const tipStyleClasses = computed(
  () => 'tooltip__tip tooltip__tip--direction-' + props.dir
)
const isMouseOver = ref<boolean>(false)
const tipRef = ref<any>(null)

const onMouseOut = () => {
  isMouseOver.value = false
}
const onMouseOver = () => {
  isMouseOver.value = true
}

const attrs = ref({
  'aria-label': props.text,
  'aria-haspopup': true
})

const events = ref({
  mouseout: onMouseOut,
  mouseover: onMouseOver
})

function setOffset() {
  const tipOffset = +props.offset + 'rem'
  let tipTransformProp: string

  if (props.dir === 'top' || props.dir === 'bottom') {
    tipTransformProp = `translateX(-50%) translateY(${tipOffset})`
  } else {
    tipTransformProp = `translateY(-50%) translateX(${tipOffset})`
  }

  tipRef.value.style.transform = tipTransformProp
}

onMounted(setOffset)
watch(tipStyleClasses, setOffset)
</script>

<style lang="scss">
.tooltip {
  position: relative;
  width: min-content;

  &__tip {
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    box-shadow: 0 2rem 10rem rgba(115, 115, 115, 0.66);
    border-radius: 4rem;
    color: $black-color;
    font-weight: 400;
    font-size: 14rem;
    font-family: sans-serif;
    white-space: nowrap;
    line-height: 130%;
    display: flex;
    letter-spacing: 0.2rem;
    position: absolute;
    text-transform: none;
    z-index: 3;
    text-align: center;
    width: max-content;
    box-sizing: border-box;
    pointer-events: none;
    transition: opacity 0.25s ease-in-out;
    opacity: 0;

    &-arrow {
      position: absolute;
      background-color: transparent;
      border-width: 6rem;
      border-style: solid;
      transition: opacity 0.25s ease-in-out;
      opacity: 1;
    }

    &--direction {
      &-bottom {
        padding: 6rem 10rem;
        top: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(var(--tipOffsetY));
        .tooltip__tip-arrow {
          border-color: #ffffff transparent transparent transparent;
          border-width: 6rem 6rem 0 6rem;
          bottom: 100%;
          transform: rotate(180deg);
        }
      }

      &-top {
        padding: 6rem 10rem;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(var(--tipOffsetY));
        .tooltip__tip-arrow {
          border-color: #ffffff transparent transparent transparent;
          border-width: 6rem 6rem 0 6rem;
          top: 100%;
        }
      }

      &-left {
        padding: 6rem 10rem;
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        .tooltip__tip-arrow {
          border-color: transparent transparent transparent #ffffff;
          border-width: 6rem 0rem 6rem 6rem;
          right: -6rem;
        }
      }

      &-right {
        padding: 6rem 10rem;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        .tooltip__tip-arrow {
          border-color: transparent #ffffff transparent transparent;
          border-width: 6rem 6rem 6rem 0rem;
          left: -6rem;
        }
      }
    }
  }

  &--active {
    .tooltip__tip,
    .tooltip__tip::after {
      opacity: 1;
    }
  }
}
</style>
