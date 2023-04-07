<template>
  <Login />
</template>

<script setup>
definePageMeta({
  middleware: ['not-auth']
})

</script>