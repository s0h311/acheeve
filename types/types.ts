interface UserProfile {
  id: string
  name: string
  authProvider: string | undefined
}

interface SignupInputs {
  id: number
  name: string
  label: string
  placeholder: string
  type?: string
  errorMessage: string
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
  created_at?: Date
  title: string
  type: number // 1 = Regular Entry, 2 = Gratitude, 3 = Anxiety
  content: object
  pictures?: object
}

export { UserProfile, SignupInputs, SignUpCredentials, HabitData, DiaryData }
