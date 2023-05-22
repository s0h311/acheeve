<template>
  <div class="hideScrollbar w-full whitespace-nowrap overflow-x-scroll overflow-y-hidden cursor-pointer">
    <div
      class="rounded-2xl inline-block float-none w-1/6 h-4/6 text-center"
      v-for="date in allDates"
      ref="dateRefs"
      :key="date.id"
      :class="[{ 'bg-primary': selectedDateId === date.id }, { 'border-2 border-dark2': todaysDateId === date.id }]"
      @click="onSelectedDateClick(date.id)"
    >
      <p
        :class="[selectedDateId === date.id ? 'text-dark' : '']"
        class="font-semibold"
      >
        {{ date.weekDay }} <br />
        {{ date.day }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WeekDays } from '~/types'
const props = defineProps({
  daysInEachDirec: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['onDateChange'])

const { t } = useI18n()
const daysInEachDirec: number = parseInt(props.daysInEachDirec)
const todaysDateId = ref<number>(daysInEachDirec)
const selectedDateId = ref<number>(daysInEachDirec)
const dateRefs = ref<HTMLElement[] | []>([])
const dates: Date[] = []

interface CalendarDay {
  id: number
  day: number
  weekDay: string
}

onMounted(() => {
  scrollToSelectedDate(selectedDateId.value)
})

const scrollToSelectedDate = (elementRef: number) => {
  if (dateRefs.value) {
    //scrolls authomatically to the current date
    dateRefs.value[elementRef].scrollIntoView({
      behavior: 'auto',
      inline: 'center',
    })
  }
}

const getDate = (fullDate: Date, diff: number): Date => {
  const year: number = fullDate.getFullYear()
  const month: number = fullDate.getMonth()
  const date: number = fullDate.getDate() + diff

  return new Date(year, month, date)
}

const allDates = computed<CalendarDay[]>(() => {
  if (daysInEachDirec == 0) return []

  const calendarDays: CalendarDay[] = []

  dates.push(getDate(new Date(), -daysInEachDirec - 1))
  let to = 2 * daysInEachDirec + 1
  for (let i = 0; i < to; i++) {
    let newDate: Date = getDate(dates[i], 1)
    calendarDays.push({
      id: i,
      day: newDate.getDate(),
      weekDay: t(WeekDays[newDate.getDay()]),
    })

    dates.push(newDate)
  }
  return calendarDays
})

const updateSelectedDate = (dateId: number) => {
  selectedDateId.value = dateId
  scrollToSelectedDate(dateId)
  let date = dates[dateId + 1]
  date.setHours(0, 0, 0, 0)
  emits('onDateChange', date)
}

const onSelectedDateClick = (dateId: number) => {
  if (selectedDateId.value === dateId) {
    updateSelectedDate(todaysDateId.value)
  } else {
    updateSelectedDate(dateId)
  }
}
</script>
