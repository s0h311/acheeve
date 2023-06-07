<template>
  <div class="grid gap-10 p-5 bg-dark2 rounded-xl">
    <BtnWithImg
      v-for="option in options"
      :key="option.id"
      :width="30"
      :height="30"
      :name="option.name"
      :imageUrl="option.imageUrl"
      @onClick="option.action"
    />
  </div>
</template>

<script setup lang="ts">
const l = useLocalePath()
const { t } = useI18n()

const options = [
  {
    id: 1,
    name: t('habits'),
    imageUrl: '/icons/hub/habits_icon.svg',
    action: () => navigateTo(l('/')),
  },

  {
    id: 2,
    name: t('diary'),
    imageUrl: '/icons/hub/diary_icon.png',
    action: () => navigateTo(l('/diary')),
  },
  {
    id: 4,
    name: t('habit'),
    imageUrl: '/icons/hub/goal_icon.svg',
    action: () => navigateTo(l('/addHabit')),
  },
  {
    id: 4,
    name: t('diary_entry'),
    imageUrl: '/icons/hub/diary_icon_blue.svg',
    action: () => navigateTo(l('/addDiaryEntry')),
  },
  {
    id: 5,
    name: t('profile'),
    imageUrl: '/icons/profile.png',
    action: () => navigateTo(l('/profile')),
  },
]
</script>
