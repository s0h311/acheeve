export default defineNuxtRouteMiddleware((to, from) => {
  const l = useLocalePath()
  const supabase = useSupabaseClient()
  const isRecovery = ref(false)
  supabase.auth.onAuthStateChange((event, _session) => {
    if (event == 'PASSWORD_RECOVERY') isRecovery.value = true
  })

  if (isRecovery.value) return
  else return navigateTo(l('/'))
})
