<template>
  <div class="relative flex px-4 py-3 bg-[#2b4276] rounded-3xl">
    <div
      class="grid gap-1 cursor-pointer"
      @click="emits('onCardClick')"
    >
      <p class="text-indigo-300 opacity-80 font-semibold text-sm">{{ schedule.toUpperCase() }}</p>
      <p class="text-red-400 text-opacity-90 font-semibold max-w-sm md:max-w-none">{{ title.toUpperCase() }}</p>
      <span
        v-if="!disableCounterAndStreak"
        class="flex items-center"
      >
        <nuxt-img
          :width="25"
          :height="25"
          :src="streakIcon"
        />
        <p class="text-indigo-300 opacity-80 font-semibold text-sm">
          {{ `${streak} ${$t('habit_streak')}` }}
        </p>
      </span>
    </div>
    <button
      :disabled="disableCounterAndStreak"
      class="absolute right-4 rounded-full border-2 border-indigo-300 w-[40px] h-[40px] text-sm text-center leading-8 opacity-70 text-opacity-75 font-semibold italic max-w-xs"
      @click="onCounterClick"
    >
      {{ disableCounterAndStreak ? 0 : counter }} / {{ goal }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: Number,
  title: String,
  schedule: String,
  streak: {
    type: Number,
    required: true,
  },
  counter: Number,
  goal: Number,
  disableCounterAndStreak: Boolean,
})
const emits = defineEmits(['onCounterClick', 'onCardClick'])

const streakIcon = computed(() => {
  return props.streak >= 30
    ? '/icons/hub/streak_full.svg'
    : props.streak >= 14 && props.streak < 30
    ? '/icons/hub/streak_half_full.svg'
    : '/icons/hub/streak_empty.svg'
})

const onCounterClick = () => {
  if (props.counter == props.goal) {
    return
  }
  emits('onCounterClick', props.id)
}
</script>
