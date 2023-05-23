import { HabitData, UserProfile } from '~/types'

export default async (habitData: HabitData, userProfile: UserProfile) => {
  try {
    const supabase = useSupabaseClient()

    const { error: habitInsertError } = await supabase.from('habit').insert([
      {
        titel: habitData.title,
        description: habitData.description || null,
        start_date: habitData.start_date,
        end_date: habitData.end_date,
        frequency: habitData.cron,
        history: habitData.history || [],
        type: habitData.type || null,
      },
    ])

    const { error: profileHabitInsertError } = await supabase
      .from('profile_habit')
      .insert([
        {
          user_id: habitData.id,
          habit_id: userProfile.id,
        },
      ])
      .single()

    const { error: profileInsertError } = await supabase
      .from('profiles')
      .insert([
        {
          name: userProfile.name,
        },
      ])
      .single()
  } catch (error) {
    console.error('Fehler beim Einfügen in die Datenbank:', error)
  }
}
