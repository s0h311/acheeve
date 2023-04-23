<template>
  <div>
    <button @click="emits('onClick')">
      <img
        :src="imageUrl"
        :alt="`Button for ${name}`"
      />
    </button>
    <p class="text-primary text-center text-xs -mt-1">{{ label }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: String,
  name: String,
  label: String,
})

const emits = defineEmits(['onClick'])
</script>
