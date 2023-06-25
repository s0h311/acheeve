<template>
  <div>
    <button
      :class="isDisabled ? 'bg-blue-200' : 'bg-blue-400'"
      class="rounded-3xl px-4 py-2.5 mt-6 w-full text-sm font-bold"
      :disabled="isDisabled"
      @click="onClick"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String,
  isDisabled: Boolean,
})
const emits = defineEmits(['click'])

const onClick = () => {
  emits('click')
}
</script>
