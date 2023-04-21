<template>
  <div class="grid grid-rows-6 place-items-start w-full mt-20">
    <InputButton
      class="w-3/6 md:w-[6%] md:absolute md:right-5"
      text="Profile"
      @click="navigateTo(l('/profile'))"
    />
    <HubSliderCal
      days-in-each-direc="14"
      @date-change="onDateChange"
    />
  </div>
</template>

<script setup lang="ts">
const l = useLocalePath()

const onDateChange = (date: Date) => {
  // update to do and habit cards
}
</script>
