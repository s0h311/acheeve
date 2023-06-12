import { ref } from 'vue'
import { HabitData } from '~/types'

export const useHabitStore = defineStore('habit', () => {
  const rawHabits = ref<HabitData[]>([])

  const habitsLeft = ref({
    alldayLeft: 0,
    morningLeft: 0,
    eveningLeft: 0,
  })

  const updateHabitsLeft = (daytime: string, delta: number) => {
    habitsLeft.value.alldayLeft += delta
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

  return { rawHabits, habitsLeft, updateHabitsLeft, resetHabitsLeft, updateRawHabits }
})
