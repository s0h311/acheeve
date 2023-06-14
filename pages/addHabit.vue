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
      class="grid gap-5"
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
      <span class="flex relative">
        <input
          class="bg-transparent outline-none text-lg"
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
        :activeOption="activeStartDate"
        :withDivider="true"
        @onChange="onStartDateChange"
      />
      <InputMultiInlineSelection
        :title="$t('frequency')"
        :options="frequencySelections"
        @onChange="(value) => (habitData.daily_or_weekly = value)"
      />
      <InputNumber
        v-if="habitData.daily_or_weekly === 'w'"
        :title="$t('add_habit_interval_title')"
        :unit="$t('week_weeks')"
        :min="1"
        :max="8"
        @onNumberChange="(number) => (habitData.frequency = number)"
      />
      <InputNumber
        v-else
        :title="$t('add_habit_interval_title')"
        :unit="$t('day_days')"
        :min="1"
        :max="6"
        :withDivider="true"
        @onNumberChange="(number) => (habitData.frequency = number)"
      />
      <InputMultiInlineSelection
        v-if="habitData.daily_or_weekly === 'w'"
        :options="thisDayOrWeekDaySelections"
        @onChange="onThisDayOrWeekDayChange"
        :withDivider="!showWeekDays"
      />
      <InputInlineWeekDaySelection
        v-if="showWeekDays"
        :options="weekDaySelections"
        :activeOptions="habitData.weekdays"
        :withDivider="true"
        @onChange="onWeekDaySelectionsChange"
      />
      <InputNumber
        :title="$t('add_habit_how_often_in_a_day')"
        :min="1"
        :max="10"
        :withDivider="true"
        @onNumberChange="(number) => (habitData.how_often = number)"
      />
      <InputMultiInlineSelection
        :title="$t('add_habit_what_time_of_day_title')"
        :options="dayTimeSelections"
        :withDivider="true"
        @onChange="(value) => (habitData.daytime = value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from '~/stores/global'
import { useHabitStore } from '~/stores/habitStore'
import { HabitData, WeekDays } from '~/types'

definePageMeta({
  layout: false,
  middleware: ['auth'],
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

onBeforeMount(() => {
  if (habitEditingId.value != 0) {
    habitData.value = habitStore.getHabitById(habitEditingId.value)
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

const frequencySelections = [
  {
    id: 'd',
    title: t('daily'),
  },
  {
    id: 'w',
    title: t('weekly'),
  },
]

const thisDayOrWeekDaySelections = [
  {
    id: 'towd1',
    title: t('add_habit_this_day'),
  },
  {
    id: 'towd2',
    title: t('add_habit_weekday'),
  },
]

const weekDaySelections = [
  {
    id: 1,
    title: WeekDays[1],
  },
  {
    id: 2,
    title: WeekDays[2],
  },
  {
    id: 3,
    title: WeekDays[3],
  },
  {
    id: 4,
    title: WeekDays[4],
  },
  {
    id: 5,
    title: WeekDays[5],
  },
  {
    id: 6,
    title: WeekDays[6],
  },
  {
    id: 7,
    title: WeekDays[7],
  },
]

const dayTimeSelections = [
  {
    id: 'morning',
    title: t('morning'),
  },
  {
    id: 'evening',
    title: t('evening'),
  },
  {
    id: 'allday',
    title: t('add_habit_selection_allday'),
  },
]

const activeStartDate = ref('s1')
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
    title: todaysDate.toLocaleDateString(),
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
  activeStartDate.value = optionId
  if (optionId === 's1') {
    habitData.value.start_date = todaysDate
  } else if (optionId === 's2') {
    let year: number = todaysDate.getFullYear()
    let month: number = todaysDate.getMonth()
    let date: number = todaysDate.getDate() + 1
    habitData.value.start_date = new Date(year, month, date)
  } else if (optionId === 's3') {
    showDatePicker.value = true
  }
}

const onThisDayOrWeekDayChange = (optionId: string) => {
  showWeekDays.value = optionId === 'towd2' ? true : false
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
  if (habitEditingId.value != 0) {
    await habitService?.updateHabit(habitEditingId.value, habitData.value)
    globalStore.setEditingHabit(0)
  } else {
    await habitService?.saveHabit(habitData.value)
  }

  await habitService?.load()
  navigateTo(l('/'))
}

const onDeleteClick = () => {}
</script>
