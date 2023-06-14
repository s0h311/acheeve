<template>
  <div class="grid gap-5">
    <div class="flex relative justify-center mb-5">
      <button
        class="absolute left-0"
        @click="onCancel"
      >
        {{ $t('cancel') }}
      </button>
      <button
        class="absolute right-0"
        @click="onSave"
      >
        {{ $t('save') }}
      </button>
    </div>
    <DatePicker
      expanded
      v-model="date"
      transparent
      borderless
      is-dark
      mode="date"
      :locale="$t('language')"
    />
  </div>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const emits = defineEmits(['onSave', 'onCancel'])

const date = ref<Date | null>(null)

const onSave = () => {
  date.value?.setHours(2, 0, 0, 0) // TODO vielleicht gar nicht nötig
  emits('onSave', date.value)
}

const onCancel = () => {
  date.value = null
  emits('onCancel')
}
</script>
