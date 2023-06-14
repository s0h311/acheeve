const weekdays: string[] = [
  'sunday_short',
  'monday_short',
  'tuesday_short',
  'wednesday_short',
  'thursday_short',
  'friday_short',
  'saturday_short',
  'sunday_short',
]

const months: string[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

const frequencySelections = [
  {
    id: 'd',
    title: 'daily',
  },
  {
    id: 'w',
    title: 'weekly',
  },
]

const thisDayOrWeekDaySelections = [
  {
    id: 'towd1',
    title: 'add_habit_this_day',
  },
  {
    id: 'towd2',
    title: 'add_habit_weekday',
  },
]

const weekDaySelections = [
  {
    id: 1,
    title: weekdays[1],
  },
  {
    id: 2,
    title: weekdays[2],
  },
  {
    id: 3,
    title: weekdays[3],
  },
  {
    id: 4,
    title: weekdays[4],
  },
  {
    id: 5,
    title: weekdays[5],
  },
  {
    id: 6,
    title: weekdays[6],
  },
  {
    id: 7,
    title: weekdays[7],
  },
]

const daytimeSelections = [
  {
    id: 'morning',
    title: 'morning',
  },
  {
    id: 'evening',
    title: 'evening',
  },
  {
    id: 'allday',
    title: 'add_habit_selection_allday',
  },
]

export { weekdays, months, frequencySelections, thisDayOrWeekDaySelections, weekDaySelections, daytimeSelections }
