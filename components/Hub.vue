<template>
  <div class="h-[95dvh] relative">
    <div class="space-y-6 mb-6">
      <h1 class="font-semibold text-2xl leading-8 whitespace-pre-wrap text-center">{{ welcomeText }}</h1>
      <HubSliderCal
        days-in-each-direc="14"
        @onDateChange="onDateChange"
      />
      <HubFilter
        @onDaytimeChange="onDaytimeChange"
        @onTodoStateChange="onTodoStateChange"
      />
    </div>
    <div class="habitList hideScrollbar overflow-y-scroll overflow-x-hidden">
      <HabitListing
        :selectedDaytime="selectedDaytime"
        :selectedDate="selectedDate"
        :selectedTodoState="selectedTodoState"
      />
    </div>
    <ClientOnly>
      <NavBar
        class="absolute bottom-2 w-full"
        v-if="isPhone && !addEntryMenuActive"
        @onClick="addEntryMenuActive = true"
      />
      <AddEntryMenu
        class="fixed bottom-0 w-[100dvw] left-0 md:w-fit md:left-auto"
        v-if="isPhone && addEntryMenuActive"
        @onClick="addEntryMenuActive = false"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { months } from '~/types'
import { useHabitStore } from '~/stores/habitStore'

const { t } = useI18n()
const l = useLocalePath()
const { isPhone } = useWindowSize()

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
</script>
<style scoped>
.habitList {
  height: 28dvh;
}

@media (min-width: 400px) {
  .habitList {
    height: 40dvh;
  }
}
</style>
