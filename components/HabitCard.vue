<template>
  <div class="relative flex px-4 py-3 cursor-pointer bg-[#2b4276] rounded-3xl">
    <div class="grid gap-1">
      <p class="text-indigo-300 opacity-80 font-semibold italic text-sm">{{ schedule }}</p>
      <p class="text-red-400 text-opacity-90 font-semibold max-w-sm md:max-w-none">{{ title }}</p>
      <p class="text-indigo-300 opacity-80 font-semibold italic text-sm">🔥 {{ streak }}</p>
    </div>
    <p
      class="absolute right-6 rounded-full border-2 border-indigo-300 w-[40px] h-[40px] text-center leading-8 opacity-70 text-opacity-75 font-semibold italic max-w-xs"
    >
      {{ counter }} / {{ goal }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  schedule: String,
  streak: String,
  counter: Number,
  goal: Number,
})
</script>
