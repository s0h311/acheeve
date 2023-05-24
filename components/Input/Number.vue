<template>
  <div class="space-y-5">
    <h1>{{ title }}</h1>
    <div class="flex space-x-3 justify-center items-center">
      <button @click="onClick(-1)">
        <nuxt-img
          src="/icons/minusbutton.svg"
          :alt="$t('decrease')"
        />
      </button>
      <p>{{ currentValue }}</p>
      <p v-if="unit">{{ unit }}</p>
      <button @click="onClick(1)">
        <nuxt-img
          src="/icons/plusbutton.svg"
          :alt="$t('increase')"
        />
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

const currentValue = ref(props.min)

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
