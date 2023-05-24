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

const habitStore = useHabitStore()

const getHabitCron = (habitCron: string): HabitCron => {
  let expression = habitCron.split(' ')
  let weekDaysString = expression[4]
  let weekDays: number[] = []
  if (weekDaysString !== '*') {
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
  let startDate = habit.start_date.getTime() / 86400000 // milliseconds to days
  let endDate = habit.end_date.getTime() / 86400000
  let selectedDate = parseInt((props.selectedDate.getTime() / 86400000).toFixed(1))

  if (selectedDate < startDate || selectedDate > endDate) {
    return false
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

const getHabitCounter = (habitId: number): number => {
  return dummyTodoStates.find((habit) => habit.habit_id == habitId)?.counter || 0
}

const getStreak = (failedDays: string[]): string => {
  let dates = failedDays.map((dateString) => new Date(dateString)) //TODO Ändern, nur für dummy
  let lastDate = dates.reduce((a, b) => (a > b ? a : b))
  let todaysDate = new Date()
  return ((todaysDate.getTime() - lastDate.getTime()) / 86400000).toFixed(0)
}

const habits = computed(() => {
  habitStore.resetHabitsLeft()
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
      habitStore.updateHabitsLeft(habit.daytime)
      return true
    })
    .filter((habit) => {
      if (props.selectedTodoState == 1) {
        return habit.counter < habit.goal
      } else {
        return habit.counter == habit.goal
      }
    })
    .filter((habit) => (props.selectedDaytime === 'allday' ? true : getHabitCron(habit.cron).dayTime === props.selectedDaytime))
})

const onCounterClick = (habitId: number) => {
  //dummyTodoStates.find((habit) => habit.habit_id == habitId) //TODO aktulisieren des counter in der entprechenden Tabelle
  emits('onCounterClick', habitId)
}
</script>
