<template>
  <div>
    <label class="text-primary text-sm ml-2">{{ label }}</label>
    <br />
    <input
    class="rounded-3xl w-full h-10 px-4 outline-none bg-textfield text-primary"
    :type="`${type ? type : 'text'}`"
    :placeholder="placeholder"
    v-model="input"
    :name="name"
    @change="onChange">
  </div>
</template>

<script setup>

const props = defineProps({
  label: String,
  type: String,
  placeholder: String,
  name: String
})

const input = ref('')

const emits = defineEmits(['changeInput'])

const onChange = () => {
  emits('changeInput', props.name, input.value)
}

</script>