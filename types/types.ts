interface UserProfile {
  id: string
  name: string
  authProvider: string | undefined
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
  start_date: Date
  streak?: number
  counter?: number
  how_often: number
  daytime: string
  frequency: number
  daily_or_weekly: string
  weekdays: number[] | null
}

interface DiaryData {
  id?: number
  created_at?: Date | string
  title: string
  type: number // 1 = Regular Entry, 2 = Gratitude, 3 = Anxiety
  content: object
  pictures?: object
}

export { UserProfile, SignupInputs, SignUpCredentials, HabitData, DiaryData }
