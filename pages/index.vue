<template>
  <Hub />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'with-nav-bar',
  pageTransition: false, // TODO remove after nuxt 3.6 or 3.5.4: https://github.com/nuxt/nuxt/issues/13309
  layoutTransition: false, // TODO remove after nuxt 3.6 or 3.5.4: https://github.com/nuxt/nuxt/issues/13309
})

const habitService = useHabitService()

onBeforeMount(() => {
  habitService?.load()
})
</script>
