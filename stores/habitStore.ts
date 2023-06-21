import { ref } from 'vue'
import { HabitData } from '~/types/types'

export const useHabitStore = defineStore('habit', () => {
  const rawHabits = ref<HabitData[]>([])

  const habitsLeft = ref({
    alldayLeft: 0,
    morningLeft: 0,
    eveningLeft: 0,
  })

  const updateHabitsLeft = (daytime: string, delta: number) => {
    if (daytime === 'allday') {
      habitsLeft.value.alldayLeft += delta
    } else if (daytime === 'morning') {
      habitsLeft.value.morningLeft += delta
    } else if (daytime === 'evening') {
      habitsLeft.value.eveningLeft += delta
    }
  }

  const resetHabitsLeft = () => {
    habitsLeft.value.alldayLeft = 0
    habitsLeft.value.morningLeft = 0
    habitsLeft.value.eveningLeft = 0
  }

  const updateRawHabits = (habits: HabitData[]) => (rawHabits.value = habits)

  const getHabitById = (habitId: number): HabitData => {
    let result = rawHabits.value.find((habit) => habit.id === habitId)
    return {
      ...result,
    } as HabitData
  }

  return { rawHabits, habitsLeft, updateHabitsLeft, resetHabitsLeft, updateRawHabits, getHabitById }
})
