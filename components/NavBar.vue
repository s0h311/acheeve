<template>
  <div class="grid grid-cols-3 w-full absolute bottom-0 px-10 -mb-4 md:left-auto">
    <BtnWithImg
      class="place-self-start"
      :width="45"
      :height="45"
      :name="$t('habits')"
      image-url="/icons/hub/habits_icon.png"
      :label="$t('habits')"
      @on-click="navigateTo(l('/'))"
    />
    <BtnWithImg
      class="-mt-10 place-self-center"
      :width="55"
      :height="55"
      :name="$t('add_new_habit_or_diary_entry')"
      image-url="/icons/hub/add_icon.png"
      @on-click="emits('onClick')"
    />
    <BtnWithImg
      class="place-self-end"
      :width="45"
      :height="45"
      :name="$t('diary')"
      image-url="/icons/hub/diary_icon.png"
      :label="$t('diary')"
      @on-click="navigateTo(l('/diary'))"
    />
  </div>
</template>

<script setup>
const emits = defineEmits(['onClick'])
const l = useLocalePath()
</script>
