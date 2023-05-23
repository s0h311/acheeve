interface UserProfile {
  id: String
  name: String
  authProvider: String
}

interface SignupInputs {
  id: Number
  name: String
  label: String
  placeholder: String
  type?: String
  errorMessage: String
}

interface SignUpCredentials {
  name: string
  email: string
  password: string
}

interface HabitData {
  id?: number
  title: string
  description?: string | null
  start_date: Date
  end_date: Date
  cron: string //TODO vielleicht noch zu 'frequency' ändern
  history?: Date[]
  type?: string | null
}

interface HabitCron {
  howOften: number
  dayTime: string
  frequency: number
  dailyOrWeekly: string
  weekDays?: number[]
}

const WeekDays: string[] = [
  'sunday_short',
  'monday_short',
  'tuesday_short',
  'wednesday_short',
  'thursday_short',
  'friday_short',
  'saturday_short',
  'sunday_short',
]

export { UserProfile, SignupInputs, SignUpCredentials, HabitData, HabitCron, WeekDays }
