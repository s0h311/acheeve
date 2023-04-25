<template>
  <div class="calendar w-full md:w-1/2 h-20 whitespace-nowrap overflow-x-scroll overflow-y-hidden cursor-pointer">
    <div
      class="rounded-2xl inline-block float-none w-1/6 h-4/6 text-center"
      v-for="date in allDates"
      ref="dateRefs"
      :key="date.id"
      :class="{ 'bg-primary': selectedDateId === date.id }"
      @click="updateSelectedDate(date.id)"
    >
      <p
        :class="[selectedDateId === date.id ? 'text-dark' : 'text-primary']"
        class="unselectable font-semibold"
      >
        {{ date.weekday }} <br />
        {{ date.day }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  daysInEachDirec: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['dateChange'])

const { t } = useI18n()
const daysInEachDirec: number = parseInt(props.daysInEachDirec)
const selectedDateId = ref<number>(daysInEachDirec)
const dateRefs = ref<HTMLElement[] | []>([])
const weekdays: string[] = [
  t('sunday_short'),
  t('monday_short'),
  t('tuesday_short'),
  t('wednesday_short'),
  t('thursday_short'),
  t('friday_short'),
  t('saturday_short'),
  t('sunday_short'),
]
const dates: Date[] = []

interface CalendarDay {
  id: number
  day: number
  weekday: string
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
      weekday: weekdays[newDate.getDay()],
    })

    dates.push(newDate)
  }
  return calendarDays
})

const updateSelectedDate = (dateId: number) => {
  selectedDateId.value = dateId
  scrollToSelectedDate(dateId)
  emits('dateChange', dates[dateId + 1])
}
</script>

<style scoped>
.calendar {
  -ms-overflow-style: none;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.calendar::-webkit-scrollbar {
  display: none;
}

.calendar div {
  zoom: 1;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
