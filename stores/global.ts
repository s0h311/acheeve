import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const editingHabitId = ref<number>(0)

  const setEditingHabit = (id: number) => {
    editingHabitId.value = id
  }

  return { editingHabitId, setEditingHabit }
})
