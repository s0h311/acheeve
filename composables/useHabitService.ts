import { HabitData } from '~/types'

export default async () => {
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

    return habits
  }

  const updateCounter = async (habitId: number, counter: number, goal: number) => {
    const { error: counterUpdateError } = await supabase.rpc('update_counter', {
      habit_id: habitId,
    })

    if (counter + 1 == goal) {
      const { error: doneTodayUpdateError } = await supabase
        .from('habit')
        .update({
          done_today: true,
        })
        .eq('id', habitId)

      const { error: streakUpdateError } = await supabase.rpc('update_streak', {
        habit_id: habitId,
      })

      if (doneTodayUpdateError || streakUpdateError) {
        throw createError({
          statusCode: 500,
          message: 'Internal Error',
        })
      }
    }

    if (counterUpdateError) {
      throw createError({
        statusCode: 500,
        message: 'Internal Error',
      })
    }
  }

  return { saveHabit, getHabits, updateCounter }
}
