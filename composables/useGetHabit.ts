import { HabitData } from '~/types'

export default async (): Promise<HabitData[]> => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const { data: habitIds, error: fetchHabitIdsError } = await supabase.from('profile_habit').select().eq('user_id', user.value?.id)
  let ids = habitIds?.map((o) => o.habit_id)

  const { data: habits, error: fetchHabitsError } = await supabase.from('habit').select().in('id', ids)

  if (fetchHabitIdsError || fetchHabitsError) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Error' }) //TODO i18n für Errormessage
  }

  return habits
}
