export default async (id: string) => {
  const supabase = useSupabaseClient()

  const { data: profile, error } = await supabase.from('profiles').select('name').eq('id', id)
  return { profile, error }
}
