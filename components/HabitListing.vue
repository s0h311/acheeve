<template>
  <div class="w-full hideScrollbar whitespace-nowrap space-y-5 overflow-y-scroll overflow-x-hidden">
    <HabitCard
      v-for="habit in habits"
      :key="habit.id"
      :id="habit.id"
      :title="habit.title"
      :schedule="habit.daytime"
      :streak="habit.streak"
      :counter="habit.counter"
      :goal="habit.goal"
      @onCounterClick="onCounterClick"
    />
  </div>
</template>

<script setup lang="ts">
import { useHabitStore } from '~/stores/habitStore'
import { HabitCron, HabitData } from '~/types'

const props = defineProps({
  selectedTodoState: Number,
  selectedDaytime: String,
  selectedDate: {
    type: Date,
    required: true,
  },
})

const habitService = await useHabitService()
const habitStore = useHabitStore()

const todaysDate = ref(new Date(new Date().toDateString()))

const { data: rawHabits, refresh } = await useAsyncData('rawHabits', async () => await habitService?.getHabits(), {
  transform: (habits) =>
    habits.map((habit) => ({
      ...habit,
      start_date: new Date(habit.start_date),
      end_date: new Date(habit.end_date),
    })),
})

watch(
  () => rawHabits,
  () => refresh()
)

const getHabitCron = (habitCron: string): HabitCron => {
  let expression = habitCron.split(' ')
  let weekDaysString = expression[4]
  let weekDays: number[] = []
  if (weekDaysString.length > 1) {
    weekDays = weekDaysString.split(',').map((weekDay) => parseInt(weekDay))
  }

  return {
    howOften: parseInt(expression[0]),
    dayTime: expression[1],
    frequency: parseInt(expression[2]),
    dailyOrWeekly: expression[3],
    weekDays,
  }
}

const isActiveOnSelectedDate = (habit: HabitData) => {
  let startDate = parseInt((habit.start_date.getTime() / 86400000).toFixed(1)) // milliseconds to days
  let endDate = parseInt((habit.end_date.getTime() / 86400000).toFixed(1))
  let selectedDate = parseInt((props.selectedDate.getTime() / 86400000).toFixed(1))

  if (selectedDate < startDate || selectedDate > endDate) {
    return false
  }

  if (selectedDate == startDate) {
    return true
  }

  let habitCron = getHabitCron(habit.cron)
  let multiplier = habitCron.dailyOrWeekly === 'w' ? habitCron.frequency * 7 : habitCron.frequency

  while (selectedDate >= startDate) {
    let weekDay = props.selectedDate.getDay()
    if (selectedDate == startDate || (habitCron.dailyOrWeekly === 'w' && habitCron.weekDays?.includes(weekDay))) {
      return true
    }
    startDate += multiplier
  }
  return false
}

const getStreak = (failedDays: Date[], startDate: Date): number => {
  let lastDate = startDate
  if (failedDays.length > 0) {
    lastDate = failedDays.reduce((a, b) => (a > b ? a : b))
  }
  return parseInt(((todaysDate.value.getTime() - lastDate.getTime()) / 86400000).toFixed(0))
}

const habits = computed(() => {
  habitStore.resetHabitsLeft()
  return rawHabits.value?.length > 0
    ? rawHabits.value
        .map((habit) => {
          return {
            ...habit,
            daytime: getHabitCron(habit.cron).dayTime,
            streak: getStreak(habit.history || [], habit.start_date),
            goal: getHabitCron(habit.cron).howOften,
          }
        })
        .filter((habit) => {
          habit.start_date.setHours(0, 0, 0, 0)
          habit.end_date.setHours(0, 0, 0, 0)
          return true
        })
        .filter((habit) => isActiveOnSelectedDate(habit))
        .filter((habit) => {
          habitStore.updateHabitsLeft(habit.daytime)
          return true
        })
        .filter((habit) => (props.selectedTodoState == 1 ? habit.counter < habit.goal : habit.counter == habit.goal))
        .filter((habit) => (props.selectedDaytime === 'allday' ? true : getHabitCron(habit.cron).dayTime === props.selectedDaytime))
    : []
})

const onCounterClick = (habitId: number) => {
  habitService?.updateCounter(habitId)
}
</script>
