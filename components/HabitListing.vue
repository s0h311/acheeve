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
import { HabitData } from '~/types'
import dummyHabits from '~/assets/dummyHabits.json'
import dummyTodoStates from '~/assets/dummyTodoState.json'

const props = defineProps({
  selectedTodoState: Number,
  selectedDaytime: String,
  selectedDate: {
    type: Date,
    required: true,
  },
})
const emits = defineEmits(['onCounterClick'])

const habits = computed(() => {
  return dummyHabits
    .map((habit) => {
      return {
        ...habit,
        start_date: new Date(habit.start_date), //TODO nur für dummy
        end_date: new Date(habit.end_date), //TODO nur für dummy
        history: habit.history.map((date) => new Date(date)), //TODO nur für dummy
        daytime: getHabitCron(habit.cron).dayTime,
        streak: getStreak(habit.history),
        counter: getHabitCounter(habit.id),
        goal: getHabitCron(habit.cron).howOften,
      }
    })
    .filter((habit) => isActiveOnSelectedDate(habit))
    .filter((habit) => {
      if (props.selectedTodoState == 1) {
        return habit.counter < habit.goal
      } else {
        return habit.counter == habit.goal
      }
    })
    .filter((habit) => (props.selectedDaytime === 'allday' ? true : getHabitCron(habit.cron).dayTime === props.selectedDaytime))
})

const getStreak = (failedDays: string[]): string => {
  let dates = failedDays.map((dateString) => new Date(dateString)) //TODO Ändern, nur für dummy
  let lastDate = dates.reduce((a, b) => (a > b ? a : b))
  let todaysDate = new Date()
  return ((todaysDate.getTime() - lastDate.getTime()) / 86400000).toFixed(0)
}

const isActiveOnSelectedDate = (habit: HabitData) => {
  let startDate = habit.start_date.getTime() / 86400000 // milliseconds to days
  let endDate = habit.end_date.getTime() / 86400000
  let selectedDate = parseInt((props.selectedDate.getTime() / 86400000).toFixed(1))

  if (selectedDate < startDate || selectedDate > endDate) {
    return false
  }

  let habitCron = getHabitCron(habit.cron)
  let multiplier = habitCron.weekly ? habitCron.frequency * 7 : habitCron.frequency

  while (selectedDate >= startDate) {
    if (selectedDate == startDate) {
      return true
    }
    startDate += multiplier
  }
  return false
}

const getHabitCron = (habitCron: string) => {
  let expression = habitCron.split(' ')
  return {
    howOften: parseInt(expression[0]),
    dayTime: expression[1],
    frequency: parseInt(expression[2]),
    daily: expression[3] === 't' ? true : false,
    weekly: expression[4] === 't' ? true : false,
  }
}

const getHabitCounter = (habitId: number): number => {
  return dummyTodoStates.find((habit) => habit.habit_id == habitId)?.counter || 0
}

const onCounterClick = (habitId: number) => {
  //dummyTodoStates.find((habit) => habit.habit_id == habitId) //TODO aktulisieren des counter in der entprechenden Tabelle
  emits('onCounterClick', habitId)
}
</script>
