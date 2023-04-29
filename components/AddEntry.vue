<template>
  <div
    class="grid grid-cols-2 gap-x-4 cursor-pointer -ml-28"
    @click="emits('onClick')"
  >
    <div class="place-self-end">
      <button>
        <nuxt-img
          :width="width"
          :height="height"
          :src="imageUrl"
          :alt="`Button for ${name}`"
        />
      </button>
    </div>
    <div class="">
      <h2 class="text-x1 text-red-400 font-semibold">{{ name }}</h2>
      <p class="text-primary text-xs">{{ label }}</p>
    </div>
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
