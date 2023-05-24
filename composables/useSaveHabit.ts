import { HabitData, UserProfile } from '~/types'

export default async (habitData: HabitData) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error: habitInsertError } = await supabase.from('habit').insert({
    title: habitData.title,
    description: habitData.description || null,
    start_date: habitData.start_date,
    end_date: habitData.end_date,
    frequency: habitData.cron,
    history: habitData.history || [],
    type: habitData.type || null,
  })

  if (habitInsertError) {
    console.log(habitInsertError)
  }

  console.log(data)

  const { error: profileHabitInsertError } = await supabase
    .from('profile_habit')
    .insert({
      user_id: user.value.id,
      habit_id: data.value.id,
    })
    .single()

  if (profileHabitInsertError) {
    console.log(profileHabitInsertError)
  }
}
