<template>
  <div class="grid grid-rows-3 place-items-start">
    <div class="grid gap-8 mt-10">
      <button
        class="absolute right-3 top-9"
        @click="navigateTo(l('/profile'))"
      >
        <img
          src="/icons/hub/settings.svg"
          alt=""
        />
      </button>
      <h1 class="text-primary font-semibold text-[26px] leading-8 whitespace-pre-wrap text-center">{{ getWelcomeText() }}</h1>
      <HubSliderCal
        days-in-each-direc="14"
        @date-change="onDateChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const l = useLocalePath()

const todaysDate: Date = new Date()
const selectedDate = ref<Date | null>(null)

const months = ['January', 'February', 'March', 'April']

const getWelcomeText = (): string => {
  let day = todaysDate.getDate()
  let month = months[todaysDate.getMonth()]

  return 'Today, ' + day + 'th ' + 'of ' + month + '\n' + '7 Habits left'
}

const onDateChange = (date: Date) => {
  selectedDate.value = date
  // update to do and habit cards
}
</script>
