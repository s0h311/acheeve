<template>
  <div
    class="flex items-center space-x-7 px-6 py-5 border-2 border-[#5195ea] cursor-pointer bg-[#2b4276] rounded-2xl w-full"
    @click="emits('onClick')"
  >
    <BtnWithImg
      :width="width"
      :height="height"
      :imageUrl="imageUrl"
    />
    <div>
      <h2 class="text-xl text-red-400 font-semibold">{{ name }}</h2>
      <p class="text-primary text-sm">{{ label }}</p>
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
