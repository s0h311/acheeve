import { HabitData } from '~/types'

export default async (habitData: HabitData) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const { data: habit, error: habitInsertError } = await supabase
    .from('habit')
    .insert({
      ...habitData,
    })
    .select()

  if (habitInsertError) {
    throw createError({ statusCode: 500, statusMessage: 'Internal Error' }) //TODO i18n für Errormessage
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
