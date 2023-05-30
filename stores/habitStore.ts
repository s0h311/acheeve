import { ref } from 'vue'

export const useHabitStore = defineStore('habit', () => {
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

  return { habitsLeft, updateHabitsLeft, resetHabitsLeft }
})
