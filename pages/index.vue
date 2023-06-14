<template>
  <Hub />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'with-nav-bar',
})

const habitService = useHabitService()

onBeforeMount(() => {
  habitService?.load()
})
</script>
