<template>
  <div
    :class="[selectedDaytime === 'allday' ? '' : 'auto-rows-min']"
    class="grid responsive-w mx-auto gap-10 relative -mt-4"
  >
    <button
      class="place-self-end"
      @click="navigateTo(l('/profile'))"
    >
      <img
        src="/icons/hub/settings.svg"
        alt=""
      />
    </button>
    <div class="grid place-items-center gap-8 -mt-8">
      <h1 class="font-semibold text-[26px] leading-8 whitespace-pre-wrap text-center">{{ welcomeText }}</h1>
      <HubSliderCal
        days-in-each-direc="14"
        @onDateChange="onDateChange"
      />
    </div>
    <HubFilter
      @onDaytimeChange="onDaytimeChange"
      @onTodoStateChange="onTodoStateChange"
    />

    <HabitListing
      class="mb-20"
      :selectedDaytime="selectedDaytime"
      :selectedDate="selectedDate"
      :selectedTodoState="selectedTodoState"
      @onCounterClick="onCounterClick"
    />

    <NavBar
      class="responsive-w absolute -mb-5 bottom-0 left-0"
      v-if="!addEntryMenuActive"
      @onClick="addEntryMenuActive = true"
    />

    <AddEntryMenu
      class="w-screen md:w-full absolute -mb-10 bottom-0 -ml-6 md:left-auto md:mx-auto"
      v-if="addEntryMenuActive"
      @onClick="addEntryMenuActive = false"
    />
  </div>
</template>

<script setup lang="ts">
import { months } from '~/types'
import { useHabitStore } from '~/stores/habitStore'
const { t } = useI18n()
const l = useLocalePath()

const selectedTodoState = ref<number>(1) // 1 = ToDo, 2 = Done
const selectedDaytime = ref<string>('allday')
const todaysDate: string = new Date().toLocaleDateString()
const selectedDate = ref<Date>(new Date())
selectedDate.value.setHours(0, 0, 0, 0)

const habitStore = useHabitStore()
const habitsLeft = computed(() => habitStore.habitsLeft)

const addEntryMenuActive = ref<boolean>(false)

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

  return (
    firstWord + ' ' + day + t(numberExtension) + ' ' + month + '\n' + habitsLeft.value.alldayLeft + ' ' + t('habits_left_welcome_text_hub')
  )
})

const onTodoStateChange = (todoState: number) => {
  selectedTodoState.value = todoState
}

const onDaytimeChange = (dayTime: string) => {
  selectedDaytime.value = dayTime
}

const onDateChange = (date: Date) => {
  selectedDate.value = date
}

const onCounterClick = (habitId: number) => {
  // update habit counter
}
</script>
