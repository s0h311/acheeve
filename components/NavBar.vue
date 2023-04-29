<template>
  <div
    v-if="isActive"
    class="grid grid-cols-3 responsive-1 absolute bottom-9 md:left-auto px-6 space-y-4"
  >
    <h1 class="row-start-1 col-start-2 self-end place-self-center text-primary text-x1 font-semibold">{{ $t('add') }}</h1>
    <BtnWithImg
      :width="20"
      :height="20"
      class="row-start-1 col-start-3 place-self-end"
      :name="$t('close_add_habit_or_entry')"
      image-url="/icons/hub/goal_icon.png"
      @on-click="isActive = !isActive"
    />
    <div class="row-start-2 col-span-3">
      <AddEntry
        class=""
        :width="50"
        :height="50"
        :name="$t('habit')"
        image-url="/icons/hub/goal_icon.png"
        :label="$t('add_habit')"
        @on-click="isActive = !isActive"
      />
      <AddEntry
        class=""
        :width="50"
        :height="50"
        :name="$t('diary')"
        image-url="/icons/hub/diary_icon.png"
        :label="$t('add_diary_entry')"
        @on-click="isActive = !isActive"
      />
    </div>
  </div>
  <div
    v-if="!isActive"
    class="grid grid-cols-3 responsive-1 absolute bottom-3 left-0 md:left-auto place-items-center px-6"
  >
    <BtnWithImg
      :width="45"
      :height="45"
      :name="$t('habits')"
      image-url="/icons/hub/habits_icon.png"
      :label="$t('habits')"
      @on-click="navigateTo(l('/habits'))"
    />
    <BtnWithImg
      :width="55"
      :height="55"
      class="-mt-14"
      :name="$t('add_new_habit_or_diary_entry')"
      image-url="/icons/hub/add_icon.png"
      @on-click="isActive = !isActive"
    />
    <BtnWithImg
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
const l = useLocalePath()
const isActive = ref(false)
</script>
