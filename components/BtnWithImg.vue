<template>
  <div>
    <button @click="emits('onClick')">
      <nuxt-img
        :width="width"
        :height="height"
        :src="imageUrl"
        :alt="`Button for ${name}`"
      />
    </button>
    <p class="text-primary text-center text-xs">{{ label }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: String,
  name: String,
  label: String,
  width: Number,
  height: Number,
})

const emits = defineEmits(['onClick'])
</script>
