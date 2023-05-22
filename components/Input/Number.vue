<template>
  <div class="space-y-5">
    <h1>{{ title }}</h1>
    <div class="flex space-x-3 justify-center items-center">
      <button
        class="rounded-full bg-primary text-black w-8 h-8 font-bold text-lg"
        @click="onClick(-1)"
      >
        -
      </button>
      <p>{{ currentValue }}</p>
      <p v-if="unit">{{ unit }}</p>
      <button
        class="rounded-full bg-primary text-black w-8 h-8 font-bold text-lg"
        @click="onClick(1)"
      >
        +
      </button>
    </div>
    <div v-if="withDivider">
      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  unit: String,
  min: Number,
  max: Number,
  withDivider: Boolean,
})
const emits = defineEmits(['input'])

const currentValue = ref(props.min || 0)

const onClick = (step: number) => {
  if (step == -1 && currentValue.value == props.min) {
    return
  }
  if (step == 1 && currentValue.value == props.max) {
    return
  }
  currentValue.value += step
  emits('input', currentValue.value)
}
</script>
