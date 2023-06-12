<template>
  <div>
    <p>this is the diary page</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
})
</script>
