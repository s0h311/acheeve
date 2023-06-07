<template>
  <div class="px-6 pt-6">
    <ClientOnly>
      <hub-side-menu
        class="absolute left-5"
        v-if="!isPhone"
      />
    </ClientOnly>
    <slot />
  </div>
</template>

<script setup lang="ts">
const { isPhone } = useWindowSize()
</script>
