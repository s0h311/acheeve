<template>
  <div
    :class="color"
    class="rounded-lg cursor-pointer px-2 pt-4 pb-2"
  >
    <p class="text-lg font-semibold">{{ title }}</p>
    <p class="text-sm leading-none">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  text: String,
  color: String,
})
</script>
