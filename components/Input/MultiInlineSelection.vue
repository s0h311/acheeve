<template>
  <div class="space-y-5">
    <h1>{{ title }}</h1>
    <div class="flex justify-center space-x-6">
      <button
        :class="[preSelected === option.id || currentActiveOption === option.id ? 'bg-primary text-dark2' : 'bg-blue-400']"
        class="rounded-3xl px-2 py-1.5 text-sm font-bold w-20 md:w-24"
        v-for="option in options"
        :key="option.id"
        @click="onChange(option.id)"
      >
        {{ option.title }}
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
  preSelected: String,
  withDivider: Boolean,
})
const emits = defineEmits(['onChange'])

const currentActiveOption = ref<string>(props.preSelected || props.options[0].id)

const onChange = (optionId: string) => {
  currentActiveOption.value = optionId
  emits('onChange', optionId)
}
</script>
