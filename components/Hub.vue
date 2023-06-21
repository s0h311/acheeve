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
  </div>
</template>

<script setup lang="ts">
import { months } from '~/types/helpers'
import { useHabitStore } from '~/stores/habitStore'

const { t } = useI18n()

const selectedTodoState = ref<number>(1) // 1 = ToDo, 2 = Done
const selectedDaytime = ref<string | null>(null)
const todaysDate: string = new Date().toLocaleDateString()
const selectedDate = ref<Date>(new Date())
selectedDate.value.setHours(0, 0, 0, 0)

const habitStore = useHabitStore()
const habitsLeft = computed(() => habitStore.habitsLeft)
const totalHabitsLeft = computed<number>(() => habitsLeft.value.alldayLeft + habitsLeft.value.morningLeft + habitsLeft.value.eveningLeft)

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

  return firstWord + ' ' + day + t(numberExtension) + ' ' + month + '\n' + totalHabitsLeft.value + ' ' + t('habits_left_welcome_text_hub')
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

@media (min-height: 600px) {
  .habitList {
    height: 40dvh;
  }
}

@media (min-height: 1000) {
  .habitList {
    height: 60dvh;
  }
}
</style>
