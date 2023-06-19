<template>
  <div class="w-full md:w-1/3 mx-auto p-7 bg-[#f08b16]">
    <AddDiaryEntry />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth'],
})
</script>
