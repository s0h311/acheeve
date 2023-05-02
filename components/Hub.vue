<template>
  <div class="responsive-w grid gap-8 h-screen mx-auto">
    <div>
      <button
        class="absolute right-3 top-3"
        @click="navigateTo(l('/profile'))"
      >
        <img
          src="/icons/hub/settings.svg"
          alt=""
        />
      </button>
      <div class="grid place-items-center gap-8 mt-8">
        <h1 class="text-primary font-semibold text-[26px] leading-8 whitespace-pre-wrap text-center">{{ getWelcomeText() }}</h1>
        <HubSliderCal
          days-in-each-direc="14"
          @date-change="onDateChange"
        />
      </div>
    </div>
    <HubFilter />
    <HabitListing />
    <div class="relative">
      <NavBar />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'centered',
})

const { t } = useI18n()
const l = useLocalePath()

const todaysDate: string = new Date().toLocaleDateString()
const selectedDate = ref<Date>(new Date())
const habitsLeft = ref<number>(4)

const months = [
  t('january'),
  t('february'),
  t('march'),
  t('april'),
  t('may'),
  t('june'),
  t('july'),
  t('august'),
  t('september'),
  t('october'),
  t('november'),
  t('december'),
]

const getWelcomeText = (): string => {
  let day = selectedDate.value.getDate()
  let month = months[selectedDate.value.getMonth()]

  let firstWord = selectedDate.value.toLocaleDateString() === todaysDate ? t('today') : ''
  let numberExtension = day.toString().endsWith('1') ? t('date_st') : day.toString().endsWith('2') ? t('date_nd') : t('date_th')

  return firstWord + ' ' + day + numberExtension + ' ' + month + '\n' + habitsLeft.value + ' ' + t('habits_left_welcome_text_hub')
}

const onDateChange = (date: Date) => {
  selectedDate.value = date
  // update to do and habit cards
}
</script>
