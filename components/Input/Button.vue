<template>
  <div>
    <button
      class="rounded-3xl bg-blue-400 px-4 py-2.5 mt-6 w-full text-sm text-primary font-bold"
      @click="onClick"
    >
      {{ text }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  text: '',
})

const emits = defineEmits(['click'])

const onClick = () => {
  emits('click')
}
</script>
