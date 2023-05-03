<template>
  <div class="responsive-w grid gap-10 mx-auto">
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
      <div class="grid place-items-center gap-8">
        <h1 class="text-primary font-semibold text-[26px] leading-8 whitespace-pre-wrap text-center">{{ welcomeText }}</h1>
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

const welcomeText = computed<string>((): string => {
  let day = selectedDate.value.getDate()
  let month = months[selectedDate.value.getMonth()]

  let firstWord = selectedDate.value.toLocaleDateString() === todaysDate ? t('today') : ''
  let dayString = day.toString()
  let numberExtension = dayString.endsWith('1')
    ? t('date_st')
    : dayString.endsWith('2')
    ? t('date_nd')
    : dayString.endsWith('3')
    ? t('date_rd')
    : t('date_th')

  return firstWord + ' ' + day + numberExtension + ' ' + month + '\n' + habitsLeft.value + ' ' + t('habits_left_welcome_text_hub')
})

const onDateChange = (date: Date) => {
  selectedDate.value = date
  // update to do and habit cards
}
</script>

<style scoped>
.responsive-w {
  @apply w-full sm:w-4/6 md:w-4/6 lg:w-3/6 xl:w-[27%] 2xl:w-[27%];
}
</style>
