<template>
  <div class="grid grid-cols-3 responsive-1 absolute bottom-0 left-0 place-items-center px-6">
    <BtnWithImg
      :name="$t('habits')"
      image-url="/icons/hub/habits_icon.png"
      :label="$t('habits')"
      @on-click="navigateTo(l('/habits'))"
    />
    <BtnWithImg
      class="-mt-14"
      :name="$t('add_new_habit_or_diary_entry')"
      image-url="/icons/hub/add_icon.png"
    />
    <BtnWithImg
      :name="$t('diary')"
      image-url="/icons/hub/diary_icon.png"
      :label="$t('diary')"
      @on-click="navigateTo(l('/diary'))"
    />
  </div>
</template>

<script setup>
const l = useLocalePath()
</script>
