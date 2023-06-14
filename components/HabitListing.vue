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
      :goal="habit.how_often"
      :disableCounterAndStreak="selectedDate.getTime() !== todaysDate.getTime()"
      @onCounterClick="onCounterClick"
      @onCardClick="onCardClick(habit.id)"
    />
    <!--TODO: Nicht der ganze Div sollte anclickbar sein-->
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'
import { useHabitStore } from '~/stores/habitStore'
import { HabitData } from '~/types'

const props = defineProps({
  selectedTodoState: Number,
  selectedDaytime: String,
  selectedDate: {
    type: Date,
    required: true,
  },
})

const l = useLocalePath()
const habitService = useHabitService()
const habitStore = useHabitStore()
const globalStore = useGlobalStore()

onMounted(() => updateHabitStore())

const todaysDate = ref(new Date(new Date().toDateString()))
const rawHabits = computed<HabitData[]>(() => habitStore.rawHabits)

const isActiveOnSelectedDate = (habit: HabitData) => {
  let startDate = parseInt((habit.start_date.getTime() / 86400000).toFixed(1)) // milliseconds to days
  let selectedDate = parseInt((props.selectedDate.getTime() / 86400000).toFixed(1))

  if (selectedDate < startDate) {
    return false
  }

  if (selectedDate == startDate) {
    return true
  }

  let multiplier = habit.daily_or_weekly === 'w' ? habit.frequency * 7 : habit.frequency

  while (selectedDate >= startDate) {
    let weekDay = props.selectedDate.getDay()
    if (selectedDate == startDate || (habit.daily_or_weekly === 'w' && habit.weekdays?.includes(weekDay))) {
      return true
    }
    startDate += multiplier
  }
  return false
}

const habits = computed(() => {
  return rawHabits.value.length > 0
    ? rawHabits.value
        .filter((habit) => isActiveOnSelectedDate(habit))
        .filter((habit) => (props.selectedDaytime === 'allday' ? true : habit.daytime === props.selectedDaytime))
        .filter((habit) => {
          if (props.selectedDate.getTime() > todaysDate.value.getTime()) {
            return true
          }
          return props.selectedTodoState == 1 ? habit.counter < habit.how_often : habit.counter == habit.how_often
        })
    : []
})

watch(habits, (_newValue, _oldValue) => {
  updateHabitStore()
})

const updateHabitStore = () => {
  if (props.selectedTodoState == 1) {
    habitStore.resetHabitsLeft()
    habits.value.forEach((habit) => habitStore.updateHabitsLeft(habit.daytime, 1))
  }
}

const onCounterClick = (habitId: number) => {
  habitService?.updateCounter(habitId)
  habitStore.updateRawHabits(
    rawHabits.value?.map((habit) => {
      if (habit.id == habitId) {
        return {
          ...habit,
          counter: habit.counter + 1,
        }
      }
      return habit
    })
  )
}

const onCardClick = (id: number) => {
  globalStore.setEditingHabit(id)
  navigateTo(l('/addHabit'))
}
</script>
