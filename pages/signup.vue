<template>
  <Signup />
</template>

<script setup>
definePageMeta({
  middleware: ['not-auth']
})

</script>