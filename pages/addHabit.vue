<template>
  <div class="responsive-w mx-auto p-7">
    <div v-if="showDatePicker">
      <DatePicker
        @onCancel="showDatePicker = !showDatePicker"
        @onSave="onDatePickerSave"
      />
    </div>
    <div
      v-else
      class="space-y-5"
    >
      <div class="flex relative justify-center mb-5">
        <BtnWithImg
          class="absolute left-0"
          imageUrl="/icons/cancel-btn.png"
          :width="20"
          :height="20"
          @onClick="onCancel"
        />
        <h1 class="text-lg font-semibold">{{ $t('add_new_habit') }}</h1>
        <button
          class="absolute right-0"
          @click="onSave"
        >
          {{ $t('save') }}
        </button>
      </div>
      <div class="space-y-5 h-[85dvh] overflow-y-scroll hideScrollbar">
        <span class="flex relative">
          <input
            class="bg-transparent outline-none text-lg w-full"
            type="text"
            :placeholder="$t('add_habit_habit_name')"
            v-model="habitData.title"
            @input="errorMessage = ''"
          />
          <BtnWithImg
            class="absolute right-0"
            v-if="habitEditingId != 0"
            image-url="/icons/delete-btn.png"
            :width="20"
            @onClick="onDeleteClick"
          />
        </span>
        <p
          v-if="errorMessage"
          class="place-self-start text-red-500 max-w-fit"
        >
          {{ $t(errorMessage) }}
        </p>
        <hr />
        <InputMultiInlineSelection
          :title="$t('add_habit_start_date_title')"
          :options="startDateSelections"
          :preSelected="preSelected.start_date"
          withDivider
          @onChange="onStartDateChange"
        />
        <InputMultiInlineSelection
          :title="$t('frequency')"
          :options="frequencySelections"
          :preSelected="preSelected.daily_or_weekly"
          @onChange="(value) => (habitData.daily_or_weekly = value)"
        />
        <InputNumber
          v-if="habitData.daily_or_weekly === 'w'"
          :title="$t('add_habit_interval_title')"
          :unit="$t('week_weeks')"
          :min="1"
          :max="8"
          :preSelected="preSelected.frequency"
          @onNumberChange="(number) => (habitData.frequency = number)"
        />
        <InputNumber
          v-else
          :title="$t('add_habit_interval_title')"
          :unit="$t('day_days')"
          :min="1"
          :max="6"
          :preSelected="preSelected.frequency"
          withDivider
          @onNumberChange="(number) => (habitData.frequency = number)"
        />
        <InputMultiInlineSelection
          v-if="habitData.daily_or_weekly === 'w'"
          :options="thisDayOrWeekDaySelections"
          :preSelected="preSelected.thisDayOrWeekDay"
          :withDivider="!showWeekDays"
          @onChange="onThisDayOrWeekDayChange"
        />
        <InputInlineWeekDaySelection
          v-if="showWeekDays"
          :options="weekDaySelections"
          :preSelected="preSelected.weekdays"
          withDivider
          @onChange="onWeekDaySelectionsChange"
        />
        <InputNumber
          :title="$t('add_habit_how_often_in_a_day')"
          :min="1"
          :max="10"
          :preSelected="preSelected.how_often"
          withDivider
          @onNumberChange="(number) => (habitData.how_often = number)"
        />
        <InputMultiInlineSelection
          :title="$t('add_habit_what_time_of_day_title')"
          :options="daytimeSelections"
          :preSelected="preSelected.daytime"
          withDivider
          @onChange="(value) => (habitData.daytime = value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'
import { useHabitStore } from '~/stores/habitStore'
import { frequencySelections, thisDayOrWeekDaySelections, weekDaySelections, daytimeSelections } from '~/types/helpers'
import { HabitData } from '~/types/types'

definePageMeta({
  layout: false,
  middleware: ['auth'],
  pageTransition: false,
  layoutTransition: false,
})

const { t } = useI18n()
const l = useLocalePath()

const habitStore = useHabitStore()
const habitService = useHabitService()
const globalStore = useGlobalStore()
const habitEditingId = computed(() => globalStore.editingHabitId)

const errorMessage = ref('')
const showWeekDays = ref(false)
const showDatePicker = ref(false)

let todaysDate = new Date()
todaysDate.setHours(0, 0, 0, 0)

let tomorrowsDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate() + 1)

onBeforeMount(() => {
  if (habitEditingId.value != 0) {
    habitData.value = habitStore.getHabitById(habitEditingId.value)
    showWeekDays.value = habitData.value.weekdays?.length > 0 || false
    startDateSelections.value[2].title = habitData.value.start_date.toLocaleDateString()
  }
})

const habitData = ref<HabitData>({
  title: '',
  start_date: todaysDate,
  how_often: 1,
  daytime: 'morning',
  frequency: 1,
  daily_or_weekly: 'd',
  weekdays: [],
})

const preSelected = computed(() => {
  return {
    ...habitData.value,
    start_date:
      habitData.value.start_date.getTime() === todaysDate.getTime()
        ? 's1'
        : habitData.value.start_date.getTime() === tomorrowsDate.getTime()
        ? 's2'
        : 's3',
    thisDayOrWeekDay: habitData.value.daily_or_weekly === 'w' && habitData.value.weekdays?.length > 0 ? 'towd2' : 'towd1',
  }
})

const startDateSelections = ref([
  {
    id: 's1',
    title: t('today'),
  },
  {
    id: 's2',
    title: t('tomorrow'),
  },
  {
    id: 's3',
    title: habitData.value.start_date.toLocaleDateString(),
  },
])

const onDatePickerSave = (date: Date) => {
  if (date) {
    habitData.value.start_date = date
    startDateSelections.value[2].title = date.toLocaleDateString()
  }
  showDatePicker.value = false
}

const onStartDateChange = (optionId: string) => {
  if (optionId === 's1') {
    habitData.value.start_date = todaysDate
  } else if (optionId === 's2') {
    habitData.value.start_date = tomorrowsDate
  } else if (optionId === 's3') {
    showDatePicker.value = true
  }
}

const onThisDayOrWeekDayChange = (optionId: string) => {
  if (optionId === 'towd1') {
    showWeekDays.value = false
    habitData.value.weekdays = []
  } else {
    showWeekDays.value = true
  }
}

const onWeekDaySelectionsChange = (optionId: number) => {
  habitData.value.weekdays?.includes(optionId)
    ? (habitData.value.weekdays = habitData.value.weekdays?.filter((o) => o !== optionId))
    : habitData.value.weekdays?.push(optionId)
}

const onCancel = () => {
  globalStore.setEditingHabit(0)
  navigateTo(l('/'))
}

const onSave = async () => {
  if (!habitData.value.title) {
    errorMessage.value = t('add_habit_habit_name_empty_error')
    return
  }
  if (showWeekDays.value && habitData.value.weekdays?.length == 0) {
    //TODO error anzeigen
  }
  habitData.value.start_date.setHours(2, 0, 0, 0) // Damit in der Datenbank auch das richtige Datum gespeichert wird
  if (habitEditingId.value != 0) {
    await habitService?.updateHabit(habitEditingId.value, habitData.value)
    globalStore.setEditingHabit(0)
  } else {
    await habitService?.saveHabit(habitData.value)
  }

  await habitService?.load()
  navigateTo(l('/'))
}

const onDeleteClick = () => {
  habitService?.deleteHabit(habitEditingId.value)
  globalStore.setEditingHabit(0)
  navigateTo(l('/'))
}
</script>
