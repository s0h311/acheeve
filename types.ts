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
  titel: String
  description: String | null
  start_date: Date
  end_date: Date
  frequency: String
  history: Date[] | null
  type: String | null
}

export { UserProfile, SignupInputs, SignUpCredentials, HabitData }
