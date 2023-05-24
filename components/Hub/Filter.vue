<template>
  <div class="space-y-3">
    <div class="grid grid-cols-2 h-1/5">
      <button
        class="rounded-md rounded-r-none font-semibold"
        :class="[selectedTodoState === 1 ? 'bg-[#595b63]' : 'bg-black']"
        @click="handleStateChange(1)"
      >
        {{ $t('todo') }}
      </button>
      <button
        class="rounded-md rounded-l-none font-semibold"
        :class="[selectedTodoState === 2 ? 'bg-[#595b63]' : 'bg-black']"
        @click="handleStateChange(2)"
      >
        {{ $t('done') }}
      </button>
    </div>
    <div
      class="grid grid-cols-2 cursor-pointer"
      v-for="daytime in daytimes"
      :key="daytime.id"
      @click="handleDaytimeChange(daytime.name)"
    >
      <div class="flex items-center space-x-3">
        <nuxt-img :src="daytime.icon" />
        <span class="flex items-center">
          <p class="text-lg leading-none font-semibold">{{ daytime.title }}</p>
          <p>&nbsp;</p>
          <p class="text-[#8c8d93] leading-none font-semibold">{{ `(${daytime.left})` }}</p>
        </span>
      </div>
      <nuxt-img
        class="place-self-end"
        :src="daytime.name === selectedDaytime ? '/icons/hub/drop_down_active.png' : '/icons/hub/drop_down_inactive.png'"
      />
      <!--muss zentriert werden-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHabitStore } from '~/stores/habitStore'

const { t } = useI18n()

const emits = defineEmits(['onTodoStateChange', 'onDaytimeChange'])

const selectedTodoState = ref<number>(1) // 1 = ToDo, 2 = Done
const selectedDaytime = ref<string>('allday')

const habitStore = useHabitStore()
const habitsLeft = computed(() => habitStore.habitsLeft)

const daytimes = computed(() => [
  {
    id: 1,
    name: 'allday',
    title: t('allday'),
    icon: '/icons/hub/allday.png',
    left: habitsLeft.value.alldayLeft,
  },
  {
    id: 2,
    name: 'morning',
    title: t('morning'),
    icon: '/icons/hub/morning.png',
    left: habitsLeft.value.morningLeft,
  },
  {
    id: 3,
    name: 'evening',
    title: t('evening'),
    icon: '/icons/hub/evening.png',
    left: habitsLeft.value.eveningLeft,
  },
])

const handleStateChange = (todoState: number) => {
  selectedTodoState.value = todoState
  emits('onTodoStateChange', todoState)
}

const handleDaytimeChange = (daytime: string) => {
  selectedDaytime.value = selectedDaytime.value === daytime ? 'allday' : daytime
  emits('onDaytimeChange', selectedDaytime.value)
}
</script>
