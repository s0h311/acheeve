<template>
  <div class="grid gap-8 grid-rows-2 place-items-start w-full">
    <InputButton
      class="w-3/6 md:w-[6%] md:absolute md:right-5"
      text="Profile"
      @click="navigateTo(l('/profile'))"
    />
  </div>
</template>

<script setup>
const l = useLocalePath()
</script>
