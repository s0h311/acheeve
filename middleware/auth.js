export default defineNuxtRouteMiddleware((to, from) => {
  const l = useLocalePath()
  const user = useSupabaseUser()
  if (user.value) return
  return navigateTo(l('/login'))
})
