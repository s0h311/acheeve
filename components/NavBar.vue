<template>
  <div class="grid grid-flow-col place-items-center">
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
const emits = defineEmits(['onClick'])
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
    id: 3,
    name: t('add_new_habit_or_diary_entry'),
    imageUrl: '/icons/add-btn.png',
    action: () => emits('onClick'),
  },
  {
    id: 4,
    name: t('profile'),
    imageUrl: '/icons/profile.png',
    action: () => navigateTo(l('/profile')),
  },
]
</script>
