<template>
  <div class="grid grid-cols-3 responsive-1 absolute bottom-3 left-0 md:left-auto place-items-center px-6">
    <BtnWithImg
      width="45"
      height="45"
      :name="$t('habits')"
      image-url="/icons/hub/habits_icon.png"
      :label="$t('habits')"
      @on-click="navigateTo(l('/habits'))"
    />
    <BtnWithImg
      width="55"
      height="55"
      class="-mt-14"
      :name="$t('add_new_habit_or_diary_entry')"
      image-url="/icons/hub/add_icon.png"
    />
    <BtnWithImg
      width="45"
      height="45"
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
