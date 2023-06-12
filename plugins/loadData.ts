export default defineNuxtPlugin(async (NuxtApp) => {
  const habitService = await useHabitService()
  await habitService?.load()
})
