<template>
  <div class="w-full grid">
    <div
      :class="[{ errorBorder: !!errorMessage }, 'focus:border-0']"
      class="flex relative items-center w-full h-14 rounded-3xl bg-dark2"
    >
      <label class="text-xs absolute left-4 top-1">{{ label }}</label>
      <br />
      <input
        :class="isDisabled ? 'text-gray-400' : ''"
        class="bg-transparent outline-none w-full absolute left-4 bottom-2"
        :type="!type || showPassword || type !== 'password' ? 'text' : 'password'"
        :placeholder="placeholder"
        :name="name"
        :disabled="isDisabled"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <button
        class="text-sm absolute top-1 right-4 underline"
        @click="$emit('activeEditing')"
      >
        {{ isDisabled ? $t('edit') : $t('cancel') }}
      </button>

      <BtnWithImg
        v-if="type === 'password'"
        class="absolute right-4"
        imageUrl="/icons/show_password.png"
        :height="30"
        @onClick="showPassword = !showPassword"
      >
        {{ $t('show') }}
      </BtnWithImg>
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
  isDisabled: Boolean,
  modelValue: String,
})
const emits = defineEmits(['update:modelValue', 'activeEditing'])

const showPassword = ref(false)
</script>
