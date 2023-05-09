import { UserProfile } from '../types'

export default async (id: string): Promise<UserProfile | string> => {
  const user = useSupabaseUser()
  if (user.value?.app_metadata.provider) {
    return {
      id,
      name: user.value.user_metadata.full_name,
      authProvider: user.value.app_metadata.provider,
    }
  } else {
    const supabase = useSupabaseClient()
    const { data, error } = await supabase.from('profiles').select().eq('id', id)
    return data
      ? {
          id,
          name: data[0].name,
          authProvider: 'email',
        }
      : useGetSupabaseErrorMessage(error)
  }
}
