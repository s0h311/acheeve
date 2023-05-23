<script lang="ts">
export const useHabitStore = defineStore('habit', () => {
  const habitsLeft = ref({
    alldayLeft: 0,
    morningLeft: 0,
    eveningLeft: 0,
  })

  function updateHabitsLeft(daytime: string) {
    console.log(daytime)
    console.log('called')
    if (daytime === 'allday') {
      habitsLeft.value.alldayLeft += 1
    } else if (daytime === 'morning') {
      habitsLeft.value.morningLeft += 1
      habitsLeft.value.alldayLeft += 1
    } else if (daytime === 'evening') {
      habitsLeft.value.eveningLeft += 1
      habitsLeft.value.alldayLeft += 1
    }
    console.log(habitsLeft.value)
  }

  return { habitsLeft, updateHabitsLeft }
})
</script>
