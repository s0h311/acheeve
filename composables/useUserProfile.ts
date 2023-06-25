import { UserProfile } from '../types/types'

export default async (): Promise<UserProfile> => {
  const user = useSupabaseUser()
  let id = user.value.id

  if (user.value && user.value.app_metadata.provider !== 'email') {
    return {
      id,
      name: user.value.user_metadata.full_name,
      email: user.value?.email,
      authProvider: user.value.app_metadata.provider,
    }
  } else {
    const supabase = useSupabaseClient()
    const { data } = await supabase.from('profiles').select('name').eq('id', id)

    return {
      id,
      name: data[0].name,
      email: user.value?.email,
      authProvider: 'email',
    }
  }
}
