<template>
  <InputButton
    text="Profile"
    @click="navigateTo(l('/profile'))"
  />
</template>

<script setup>
const l = useLocalePath()
</script>
