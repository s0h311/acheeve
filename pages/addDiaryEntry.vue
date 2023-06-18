<template>
  <div class="responsive-w mx-auto p-7 bg-[#f08b16]">
    <AddDiaryEntry />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
})
</script>
