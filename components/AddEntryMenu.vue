<template>
  <div class="grid gap-8 pb-8 pt-4 px-6 bg-[#1b2a4a] rounded-t-3xl">
    <div class="flex items-center justify-center relative">
      <h1 class="text-center text-xl">{{ $t('add') }}</h1>
      <button
        class="font-semibold text-2xl absolute right-0"
        @click="emits('onClick')"
      >
        X
      </button>
    </div>
    <AddEntry
      class=""
      :width="50"
      :height="50"
      :name="$t('habit')"
      image-url="/icons/hub/goal_icon.png"
      :label="$t('add_habit')"
      @on-click="emits('onClick')"
    />
    <AddEntry
      class=""
      :width="50"
      :height="50"
      :name="$t('diary_entry')"
      image-url="/icons/hub/diary_icon.png"
      :label="$t('add_diary_entry')"
      @on-click="emits('onClick')"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['onClick'])
</script>
