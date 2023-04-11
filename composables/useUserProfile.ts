export default async (id: string) => {
  const supabase = useSupabaseClient()

  const { data: profile, error } = await supabase   
    .from('profiles')
    .select()
    .eq('id', id)

<<<<<<< HEAD

=======
>>>>>>> e128315 (cleanup, homepage)
    return profile
}