import { ref } from 'vue'
import { DiaryData } from '~/types/types'

export const useGlobalStore = defineStore('global', () => {
  const editingHabitId = ref<number>(0)
  const editingEntry = ref<DiaryData | null>(null)

  const setEditingHabit = (id: number) => {
    editingHabitId.value = id
  }

  const setEditingEntry = (entry: DiaryData | null) => {
    editingEntry.value = entry
  }

  return { editingHabitId, editingEntry, setEditingHabit, setEditingEntry }
})
