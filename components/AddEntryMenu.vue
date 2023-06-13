<template>
  <div class="grid gap-8 p-5 bg-[#1b2a4a] rounded-t-3xl">
    <div class="flex items-center justify-center relative">
      <h1 class="text-center text-xl">{{ $t('add') }}</h1>
      <BtnWithImg
        class="absolute right-0"
        imageUrl="/icons/cancel-btn.png"
        :width="25"
        :height="25"
        @onClick="emits('onClick')"
      />
    </div>
    <AddEntry
      class=""
      :width="50"
      :height="50"
      :name="$t('habit')"
      image-url="/icons/hub/goal_icon.svg"
      :label="$t('add_habit')"
      @onClick="navigateTo(l('/addHabit'))"
    />
    <AddEntry
      class=""
      :width="50"
      :height="50"
      :name="$t('diary_entry')"
      image-url="/icons/hub/diary_icon_blue.svg"
      :label="$t('add_diary_entry')"
      @onClick="navigateTo(l('/addDiaryEntry'))"
    />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['onClick'])

const l = useLocalePath()

const xButton = '&#9587'
</script>
