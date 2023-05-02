<template>
  <div
    :class="[{ errorBorder: isError }, 'focus:border-0']"
    class="rounded-3xl responsive-w h-14 px-4 bg-dark2"
  >
    <label class="text-primary text-xs">{{ label }}</label>
    <br />
    <input
      class="text-primary bg-transparent outline-none"
      :type="`${type ? type : 'text'}`"
      :placeholder="placeholder"
      v-model="input"
      :name="name"
      @change="onChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  name: String,
  isError: Boolean,
})

const input = ref('')

const emits = defineEmits(['changeInput'])

const onChange = () => {
  emits('changeInput', props.name, input.value)
}
</script>
