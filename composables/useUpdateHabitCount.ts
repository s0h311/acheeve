export default async (habitId: number, newCount: number): Promise<number> => {
  const supabase = useSupabaseClient()

  const { data, error } = supabase
    .from('counter')
    .insert({
      count: newCount,
    })
    .eq('id', habitId)
    .select()
}
