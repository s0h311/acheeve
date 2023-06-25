import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params

  const supabase = serverSupabaseServiceRole(event)
  const { data, error } = await supabase.auth.admin.deleteUser(userId)

  return { data, error }
})
