<template>
  <Teleport to="#dialogs" v-if="isTeleportContainerMounted">
    <Transition name="overlay-fade">
      <div class="dialog" v-show="show" :class="$attrs.class">
        <div class="dialog__overlay" @click="closeDialogWindow">
          <Transition name="toggle-dialog">
            <div class="dialog__content" v-show="show" @click.stop>
              <AppButton
                variant="clear"
                class="dialog__close-button"
                :title="localize('Base.closeDialog')"
                @click="closeDialogWindow"
              >
                <AppIcon name="close" />
              </AppButton>
              <div class="dialog__header" v-if="title">
                <div class="dialog__header-title">{{ title }}</div>
              </div>
              <slot></slot>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, withDefaults } from 'vue'
import AppButton from '@/components/UI/AppButton.vue'
import AppIcon from '@/components/UI/AppIcon.vue'
import { localize } from '@/localization/localize'

interface IDialogProps {
  show?: boolean
  title?: string
}

interface IDialogEmits {
  (e: 'update:show', value: boolean): void
}

const props = withDefaults(defineProps<IDialogProps>(), {
  show: false
})

const emit = defineEmits<IDialogEmits>()

const isTeleportContainerMounted = ref(false)

function closeDialogWindow() {
  emit('update:show', false)
}

onMounted(() => {
  isTeleportContainerMounted.value = true
})
</script>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  backdrop-filter: blur(5rem);

  &__overlay {
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  &__content {
    max-width: 600rem;
    min-height: 200rem;
    width: 100%;
    background-color: $color-white;
    border: 1rem solid $gray-color-4;
    border-radius: 8rem;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: relative;
  }

  &__header {
    text-align: center;
    font-size: 25rem;
    font-weight: 600;
    padding: 15rem 20rem;
    width: 100%;
    user-select: none;
  }

  &__close-button.app-button {
    position: absolute;
    top: 20rem;
    right: 20rem;

    &:hover {
      color: $red-color-2;
    }
  }
}
</style>
