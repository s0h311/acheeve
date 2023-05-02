<template>
  <div class="w-full h-[60%] hideScrollbar whitespace-nowrap space-y-5 overflow-y-scroll overflow-x-hidden">
    <HabitCard
      v-for="habit in dummyHabits"
      :key="habit.id"
      :id="habit.id"
      :title="habit.title"
      :schedule="habit.schedule"
      :streak="habit.streak"
      :counter="habit.counter"
      :goal="habit.goal"
    />
  </div>
</template>

<script setup>
const dummyHabits = [
  {
    id: 1,
    title: 'GEH MIT DEM HUND',
    schedule: 'Jeden Morgen',
    streak: 'X- DAY SUCCESSION',
    counter: 2,
    goal: 5,
  },
  {
    id: 2,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2- DAY SUCCESSION',
    counter: 2,
    goal: 5,
  },
  {
    id: 3,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2- DAY SUCCESSION',
    counter: 2,
    goal: 5,
  },
  {
    id: 4,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2- DAY SUCCESSION',
    counter: 2,
    goal: 5,
  },
  {
    id: 5,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2- DAY SUCCESSION',
    counter: 2,
    goal: 5,
  },
  {
    id: 6,
    title: 'GEH MIT DEM HUND',
    schedule: 'ABEND',
    streak: '2- DAY SUCCESSION',
    counter: 2,
    goal: 5,
  },
]

const habitList = ref([])

const addHabit = (title) => {
  habitList.value.push({
    title,
    isDone: false,
  })
}
</script>
