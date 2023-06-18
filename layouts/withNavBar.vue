<template>
  <div class="px-6 pt-6">
    <ClientOnly>
      <HubSideMenu
        class="absolute left-5 opacity-0 md:opacity-100"
        v-if="!isPhone"
      />
    </ClientOnly>
    <div class="responsive-w mx-auto">
      <slot />
    </div>
    <ClientOnly>
      <NavBar
        class="absolute bottom-5 w-full left-0"
        v-if="isPhone && !addEntryMenuActive"
        @onClick="addEntryMenuActive = true"
      />
      <AddEntryMenu
        class="fixed bottom-0 w-[100dvw] left-0"
        v-if="isPhone && addEntryMenuActive"
        @onClick="addEntryMenuActive = false"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { isPhone } = useWindowSize()

const addEntryMenuActive = ref(false)
</script>
