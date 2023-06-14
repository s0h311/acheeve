import { HabitData } from '~/types/types'
import { useHabitStore } from '~/stores/habitStore'

export default () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  if (!user.value) {
    return
  }

  const saveHabit = async (habitData: HabitData) => {
    const { data: habit, error: habitInsertError } = await supabase
      .from('habit')
      .insert({
        ...habitData,
      })
      .select()

    if (habitInsertError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    }

    const { error: profileHabitInsertError } = await supabase
      .from('profile_habit')
      .insert({
        user_id: user.value.id,
        habit_id: habit[0].id,
      })
      .single()

    if (profileHabitInsertError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    }
  }

  const getHabits = async () => {
    const { data: habitIds, error: fetchHabitIdsError } = await supabase.from('profile_habit').select().eq('user_id', user.value?.id)
    let ids = habitIds?.map((o) => o.habit_id)

    const { data: habits, error: fetchHabitsError } = await supabase.from('habit').select().in('id', ids)

    if (fetchHabitIdsError || fetchHabitsError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    }

    return habits.map((habit) => {
      return {
        ...habit,
        start_date: new Date(new Date(habit.start_date).toDateString()),
      }
    })
  }

  const updateCounter = async (habitId: number) => {
    const { error: counterUpdateError } = await supabase.rpc('update_counter', {
      habit_id: habitId,
    })

    if (counterUpdateError) {
      throw createError({
        statusCode: 500,
        message: 'Internal Error',
      })
    }
  }

  const updateHabit = async (habitId: number, habit: HabitData) => {
    const { error: updateHabitError } = await supabase
      .from('habit')
      .update({
        ...habit,
      })
      .eq('id', habitId)

    if (updateHabitError) {
      throw createError({ statusCode: 500, statusMessage: 'Internal Error' })
    }
  }

  const deleteHabit = async (habitId: number) => {
    await supabase.from('habit').delete().eq('id', habitId)
  }

  const load = async () => {
    let rawHabits = await getHabits()
    const habitStore = useHabitStore()
    habitStore.updateRawHabits(rawHabits)
  }

  return { saveHabit, getHabits, updateCounter, load, updateHabit, deleteHabit }
}
