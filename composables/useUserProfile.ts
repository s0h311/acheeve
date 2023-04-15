export default async (id: string) => {
  const supabase = useSupabaseClient()

  const { data: profile, error } = await supabase.from('profiles').select().eq('id', id)
  return { profile, error }
}
