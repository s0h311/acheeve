export default async (id: string) => {
  const supabase = useSupabaseClient()

  const { data, error } = await supabase.from('profiles').select().eq('id', id)
  return { data, error }
}
