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
        <h1 class="font-semibold text-[26px] leading-8 whitespace-pre-wrap text-center">{{ welcomeText }}</h1>
        <HubSliderCal
          days-in-each-direc="14"
          @date-change="onDateChange"
        />
      </div>
    </div>
    <HubFilter
      morningLeft="5"
      eveningLeft="2"
      alldayLeft="3"
    />
    <HabitListing
      class="h-full"
      @onCounterClick="onCounterClick"
    />
    <div class="relative mt-10">
      <NavBar
        v-if="!addEntryMenuActive"
        @onClick="addEntryMenuActive = true"
      />
    </div>
    <AddEntryMenu
      class="w-full absolute bottom-0 left-0 md:left-auto"
      v-if="addEntryMenuActive"
      @onClick="addEntryMenuActive = false"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const l = useLocalePath()

const todaysDate: string = new Date().toLocaleDateString()
const selectedDate = ref<Date>(new Date())
const habitsLeft = ref<number>(4)
const addEntryMenuActive = ref<boolean>(false)
const months: string[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const welcomeText = computed<string>((): string => {
  let day = selectedDate.value.getDate()
  let month = t(months[selectedDate.value.getMonth()])

  let firstWord = selectedDate.value.toLocaleDateString() === todaysDate ? t('today') : ''
  let dayString = day.toString()
  let numberExtension =
    dayString.startsWith('1') && dayString.length === 2
      ? 'date_th'
      : dayString.endsWith('1')
      ? 'date_st'
      : dayString.endsWith('2')
      ? 'date_nd'
      : dayString.endsWith('3')
      ? 'date_rd'
      : 'date_th'

  return firstWord + ' ' + day + t(numberExtension) + ' ' + month + '\n' + habitsLeft.value + ' ' + t('habits_left_welcome_text_hub')
})

const onDateChange = (date: Date) => {
  selectedDate.value = date
  // update to do and habit cards
}

const onCounterClick = (habitId: number) => {
  // update habit counter
}
</script>
