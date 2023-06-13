<template>
  <div class="px-6 pt-6">
    <ClientOnly>
      <HubSideMenu
        class="absolute left-5 opacity-0 md:opacity-100"
        v-if="!isPhone"
      />
    </ClientOnly>
    <div class="responsive-w mx-auto">
      <Hub />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const habitService = useHabitService()

onBeforeMount(() => {
  habitService?.load()
})

const { isPhone } = useWindowSize()
</script>
