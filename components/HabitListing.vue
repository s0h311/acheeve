<template>
  <div class="w-full hideScrollbar whitespace-nowrap space-y-5 overflow-y-scroll overflow-x-hidden">
    <HabitCard
      v-for="habit in dummyHabits"
      :key="habit.id"
      :id="habit.id"
      :title="habit.title"
      :schedule="habit.schedule"
      :streak="habit.streak"
      :counter="habit.counter"
      :goal="habit.goal"
      @onCounterClick="onCounterClick"
    />
  </div>
</template>

<script setup lang="ts">
const dummyHabits = [
  {
    id: 1,
    title: 'GEH MIT DEM HUND',
    schedule: 'Jeden Morgen',
    streak: 'X',
    counter: 2,
    goal: 5,
  },
  {
    id: 2,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2',
    counter: 2,
    goal: 5,
  },
  {
    id: 3,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2',
    counter: 2,
    goal: 5,
  },
  {
    id: 4,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2',
    counter: 2,
    goal: 5,
  },
  {
    id: 5,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2',
    counter: 7,
    goal: 7,
  },
  {
    id: 6,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2',
    counter: 2,
    goal: 5,
  },
]

const emits = defineEmits(['onCounterClick'])

const onCounterClick = (habitId: number) => {
  emits('onCounterClick', habitId)
}
</script>
