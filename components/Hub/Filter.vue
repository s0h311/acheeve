<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 h-1/5">
      <button
        class="rounded-md rounded-r-none font-semibold"
        :class="[selectedState === 1 ? 'bg-[#595b63]' : 'bg-black']"
        @click="handleStateChange(1)"
      >
        {{ $t('todo') }}
      </button>
      <button
        class="rounded-md rounded-l-none font-semibold"
        :class="[selectedState === 2 ? 'bg-[#595b63]' : 'bg-black']"
        @click="handleStateChange(2)"
      >
        {{ $t('done') }}
      </button>
    </div>
    <div
      class="grid grid-cols-2 cursor-pointer"
      v-for="daytime in daytimes"
      :key="daytime.id"
      @click="handleDaytimeChange(daytime.id)"
    >
      <div class="flex items-center space-x-3">
        <nuxt-img :src="daytime.icon" />
        <p class="text-primary text-lg leading-none font-semibold">{{ `${daytime.name} (${daytime.left})` }}</p>
      </div>
      <nuxt-img
        class="place-self-end"
        :src="daytime.id === selectedDaytime ? '/icons/hub/drop_down_active.png' : '/icons/hub/drop_down_inactive.png'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  morningLeft: String,
  eveningLeft: String,
  alldayLeft: String,
})
const emits = defineEmits(['onStateChange', 'onDaytimeChange'])

const selectedState = ref<number>(1) // 1 = ToDo, 2 = Done
const selectedDaytime = ref<number>(0) // 1 = morning, 2 = evening, 3 = allday

const daytimes = [
  {
    id: 1,
    name: t('morning'),
    icon: '/icons/hub/morning.png',
    left: props.morningLeft,
  },
  {
    id: 2,
    name: t('evening'),
    icon: '/icons/hub/evening.png',
    left: props.eveningLeft,
  },
  {
    id: 3,
    name: t('allday'),
    icon: '/icons/hub/allday.png',
    left: props.alldayLeft,
  },
]

const handleStateChange = (state: number) => {
  selectedState.value = state
  emits('onStateChange', state)
}

const handleDaytimeChange = (daytime: number) => {
  selectedDaytime.value = selectedDaytime.value === daytime ? 0 : daytime
  emits('onDaytimeChange', daytime)
}
</script>
