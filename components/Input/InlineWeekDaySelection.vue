<template>
  <div class="space-y-5">
    <h1>{{ title }}</h1>
    <div class="flex justify-center space-x-1.5">
      <button
        :class="[preSelected.includes(option.id) ? 'bg-primary text-dark2' : '']"
        class="rounded-full py-1.5 text-sm font-bold w-10 h-10"
        v-for="option in options"
        :key="option.id"
        @click="onChange(option.id)"
      >
        {{ $t(option.title) }}
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
  options: Object,
  preSelected: { type: Array<number>, required: true },
  withDivider: Boolean,
})
const emits = defineEmits(['onChange'])

const onChange = (optionId: number) => {
  emits('onChange', optionId)
}
</script>
