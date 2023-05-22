<template>
  <div class="relative flex px-4 py-3 bg-[#2b4276] rounded-3xl">
    <div class="grid gap-1">
      <p class="text-indigo-300 opacity-80 font-semibold text-sm">{{ schedule.toUpperCase() }}</p>
      <p class="text-red-400 text-opacity-90 font-semibold max-w-sm md:max-w-none">{{ title.toUpperCase() }}</p>
      <p class="text-indigo-300 opacity-80 font-semibold text-sm">🔥 {{ `${streak} ${$t('habit_streak')}` }}</p>
    </div>
    <button
      class="absolute right-4 rounded-full border-2 border-indigo-300 w-[40px] h-[40px] text-sm text-center leading-8 opacity-70 text-opacity-75 font-semibold italic max-w-xs"
      @click="emits('onCounterClick', id)"
    >
      {{ counter }} / {{ goal }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  schedule: String,
  streak: String,
  counter: Number,
  goal: Number,
})
const emits = defineEmits(['onCounterClick'])
</script>
