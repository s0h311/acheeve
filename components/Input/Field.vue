<template>
  <div class="w-full grid place-items-center">
    <div
      :class="[{ errorBorder: !!errorMessage }, 'focus:border-0']"
      class="rounded-3xl w-full h-14 px-4 bg-dark2"
    >
      <label class="text-xs">{{ label }}</label>
      <br />
      <input
        class="bg-transparent outline-none"
        :type="`${type ? type : 'text'}`"
        :placeholder="placeholder"
        v-model="input"
        :name="name"
        @change="onChange"
      />
    </div>
    <p
      v-if="errorMessage"
      class="place-self-start text-red-500 max-w-fit"
    >
      {{ $t(errorMessage) }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  name: String,
  errorMessage: String,
})

const input = ref('')

const emits = defineEmits(['changeInput'])

const onChange = () => {
  emits('changeInput', props.name, input.value)
}
</script>
