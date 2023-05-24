import { ref } from 'vue'

export const useHabitStore = defineStore('habit', () => {
  const habitsLeft = ref({
    alldayLeft: 0,
    morningLeft: 0,
    eveningLeft: 0,
    allLeft: 0,
  })

  const updateHabitsLeft = (daytime: string) => {
    habitsLeft.value.allLeft += 1
    if (daytime === 'allday') {
      habitsLeft.value.alldayLeft += 1
    } else if (daytime === 'morning') {
      habitsLeft.value.morningLeft += 1
    } else if (daytime === 'evening') {
      habitsLeft.value.eveningLeft += 1
    }
  }

  const resetHabitsLeft = () => {
    habitsLeft.value.allLeft = 0
    habitsLeft.value.alldayLeft = 0
    habitsLeft.value.morningLeft = 0
    habitsLeft.value.eveningLeft = 0
  }

  return { habitsLeft, updateHabitsLeft, resetHabitsLeft }
})
