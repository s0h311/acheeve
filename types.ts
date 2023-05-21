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
  id: number
  title: string
  description: string | null
  start_date: Date
  end_date: Date
  cron: string
  history: Date[] | null
  type: string | null
}

export { UserProfile, SignupInputs, SignUpCredentials, HabitData }
