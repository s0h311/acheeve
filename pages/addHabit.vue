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
        <button
          class="absolute left-0"
          @click="navigateTo(l('/'))"
        >
          {{ $t('cancel') }}
        </button>
        <h1 class="text-lg font-semibold">{{ $t('add_new_habit') }}</h1>
        <button
          class="absolute right-0"
          @click="onSave"
        >
          {{ $t('save') }}
        </button>
      </div>
      <input
        class="bg-transparent outline-none text-lg"
        type="text"
        :placeholder="$t('add_habit_habit_name')"
        v-model="habitData.title"
        @input="errorMessage = ''"
      />
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
        @onChange="onDailyOrWeeklyChange"
      />
      <InputNumber
        v-if="habitCron.dailyOrWeekly === 'w'"
        :title="$t('add_habit_interval_title')"
        :unit="$t('week_weeks')"
        :min="1"
        :max="8"
        v-model="habitCron.frequency"
      />
      <InputNumber
        v-else
        :title="$t('add_habit_interval_title')"
        :unit="$t('day_days')"
        :min="1"
        :max="6"
        :withDivider="true"
        v-model="habitCron.frequency"
      />
      <InputMultiInlineSelection
        v-if="habitCron.dailyOrWeekly === 'w'"
        :options="thisDayOrWeekDaySelections"
        @onChange="onThisDayOrWeekDayChange"
        :withDivider="!showWeekDays"
      />
      <InputInlineWeekDaySelection
        v-if="showWeekDays"
        :options="weekDaySelections"
        :activeOptions="habitCron.weekDays"
        :withDivider="true"
        @onChange="onWeekDaySelectionsChange"
      />
      <InputNumber
        :title="$t('add_habit_how_often_in_a_day')"
        :min="1"
        :max="10"
        :withDivider="true"
        v-model="habitCron.howOften"
      />
      <InputMultiInlineSelection
        :title="$t('add_habit_what_time_of_day_title')"
        :options="dayTimeSelections"
        :withDivider="true"
        @onChange="onDayTimeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HabitCron, HabitData, WeekDays } from '~/types'

definePageMeta({
  layout: '',
})

const { t } = useI18n()
const l = useLocalePath()

const errorMessage = ref('')
const showWeekDays = ref(false)
const showDatePicker = ref(false)

const getHabitCronString = (habitCron: HabitCron): string => {
  let cron = ''
  for (let attribute in habitCron) {
    if (habitCron[attribute] instanceof Array) {
      cron += habitCron[attribute].join() + ' '
    } else {
      cron += habitCron[attribute] + ' '
    }
  }
  cron += '*'
  return cron
}

const habitCron = reactive<HabitCron>({
  howOften: 1,
  dayTime: 'morning',
  frequency: 1,
  dailyOrWeekly: 'd',
  weekDays: [1],
})

const todaysDate = new Date()
todaysDate.setHours(0, 0, 0, 0)

const habitData = reactive<HabitData>({
  title: '',
  start_date: new Date(),
  end_date: new Date('2999-01-01'),
  cron: getHabitCronString(habitCron),
})

const frequencySelections = [
  {
    id: 'f1',
    title: t('daily'),
  },
  {
    id: 'f2',
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
    title: WeekDays[0],
  },
  {
    id: 2,
    title: WeekDays[1],
  },
  {
    id: 3,
    title: WeekDays[2],
  },
  {
    id: 4,
    title: WeekDays[3],
  },
  {
    id: 5,
    title: WeekDays[4],
  },
  {
    id: 6,
    title: WeekDays[5],
  },
  {
    id: 7,
    title: WeekDays[6],
  },
]

const dayTimeSelections = [
  {
    id: 'dt1',
    title: t('morning'),
  },
  {
    id: 'dt2',
    title: t('evening'),
  },
  {
    id: 'dt3',
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
    habitData.start_date = date
  }
  showDatePicker.value = false
  startDateSelections.value[2].title = date.toLocaleDateString()
}

const onStartDateChange = (optionId: string) => {
  activeStartDate.value = optionId
  if (optionId === 's1') {
    habitData.start_date = todaysDate
  } else if (optionId === 's2') {
    let year: number = todaysDate.getFullYear()
    let month: number = todaysDate.getMonth()
    let date: number = todaysDate.getDate() + 1
    habitData.start_date = new Date(year, month, date)
  } else if (optionId === 's3') {
    showDatePicker.value = true
  }
}

const onDailyOrWeeklyChange = (optionId: string) => {
  if (optionId === 'f1') {
    habitCron.dailyOrWeekly = 'd'
  } else {
    habitCron.dailyOrWeekly = 'w'
  }
}

const onDayTimeChange = (optionId: string) => {
  if (optionId === 'dt1') {
    habitCron.dayTime = 'morning'
  } else if (optionId === 'dt2') {
    habitCron.dayTime = 'evening'
  } else {
    habitCron.dayTime = 'allday'
  }
}

const onThisDayOrWeekDayChange = (optionId: string) => {
  showWeekDays.value = optionId === 'towd2' ? true : false
}

const onWeekDaySelectionsChange = (optionId: number) => {
  habitCron.weekDays?.includes(optionId)
    ? (habitCron.weekDays = habitCron.weekDays?.filter((o) => o !== optionId))
    : habitCron.weekDays?.push(optionId)
}

const onSave = () => {
  if (!habitData.title) {
    errorMessage.value = t('add_habit_habit_name_empty_error')
    return
  }
  if (showWeekDays.value && habitCron.weekDays?.length == 0) {
    //TODO error anzeigen
  }
  habitData.cron = getHabitCronString(habitCron)
  useSaveHabit(habitData)
  navigateTo(l('/'))
}
</script>
