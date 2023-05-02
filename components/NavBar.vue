<template>
  <div
    v-if="isActive"
    class="grid place-items-center gap-8 pb-8 pt-4 px-6 responsive-1 absolute bottom-0 md:left-auto bg-[#1b2a4a] rounded-t-3xl"
  >
    <div class="flex items-center">
      <h1 class="text-center text-primary text-xl">{{ $t('add') }}</h1>
      <button
        class="text-primary font-semibold text-2xl absolute right-6"
        @click="isActive = !isActive"
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
      @on-click="isActive = !isActive"
    />
    <AddEntry
      class=""
      :width="50"
      :height="50"
      :name="$t('diary_entry')"
      image-url="/icons/hub/diary_icon.png"
      :label="$t('add_diary_entry')"
      @on-click="isActive = !isActive"
    />
  </div>
  <div
    v-else
    class="grid grid-cols-3 responsive-1 absolute bottom-3 left-0 md:left-auto place-items-center px-6"
  >
    <BtnWithImg
      :width="45"
      :height="45"
      :name="$t('habits')"
      image-url="/icons/hub/habits_icon.png"
      :label="$t('habits')"
      @on-click="navigateTo(l('/'))"
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
