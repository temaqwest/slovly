<template>
  <div class="settings-dialog__content">
    <div class="settings-dialog__block">
      <h2 class="settings-dialog__title">
        {{ localize('SettingsDialog.language') }}
      </h2>
      <AppSelect v-model="langSelectValue" :items="languageOptions" />
    </div>
    <div class="settings-dialog__divider" />
    <div class="settings-dialog__block">
      <h2 class="settings-dialog__title">
        {{ localize('SettingsDialog.theme') }}
      </h2>
      <AppSwitch v-model="themeSwitcher" />
    </div>
    <div class="settings-dialog__divider" />
    <div class="settings-dialog__block">
      <h2 class="settings-dialog__title">
        {{ localize('SettingsDialog.questions') }}
      </h2>
      <AppButton type="link" href="mailto:taylorartem95@gmail.com">
        {{ localize('SettingsDialog.answers') }}
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  AvailableLocales,
  getBrowserLocale,
  localize,
  setLocale
} from '@/localization/localize'
import { computed, ref, watch } from 'vue'
import AppSelect from '@/components/UI/AppSelect.vue'
import AppSwitch from '@/components/UI/AppSwitch.vue'
import AppButton from '@/components/UI/AppButton.vue'
import { useRouter } from 'vue-router'
import { SelectOption } from '@/assets/interfaces/BaseInterfaces'
import { useMainStore } from '@/store/mainStore'
import { Theme } from '@/assets/enums/Theme'

const mainStore = useMainStore()
const router = useRouter()
const languageOptions = computed(() => {
  return Object.entries(AvailableLocales).map(([key, value]) => ({
    title: localize('Base.' + key),
    value: key
  }))
})
const langSelectValue = ref<SelectOption | null>(
  languageOptions.value.filter(
    (i: any) => i.value === getBrowserLocale().slice(-2)
  )[0] ?? null
)

const themeSwitcher = ref<boolean>(mainStore.getCurrentTheme === Theme.black)

function toggleTheme() {
  const currentTheme = mainStore.getCurrentTheme

  const newTheme = currentTheme === Theme.black ? Theme.light : Theme.black

  mainStore.setCurrentTheme(newTheme)
}

watch(() => themeSwitcher.value, toggleTheme)

watch(
  () => langSelectValue.value,
  (newValue: any) => {
    const newLang = newValue.value as keyof typeof AvailableLocales
    setLocale(AvailableLocales[newLang])
    router.go(0)
  }
)
</script>

<style lang="scss" scoped>
.settings-dialog {
  &__content {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    padding: 0 20rem 20rem 20rem;
    width: 100%;
  }

  &__block {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__text {
    font-size: 16rem;
    line-height: 130%;
    margin-bottom: 8rem;
    color: var(--black-color);

    &--bold {
      font-weight: bold;
    }
  }

  &__title {
    font-size: 19rem;
    font-weight: 400;
    text-align: left;
    color: var(--black-color);
  }

  &__divider {
    height: 1rem;
    width: 100%;
    background-color: $gray-color-4;
    margin: 10rem 0;
  }
}
</style>
