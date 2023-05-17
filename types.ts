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

export { UserProfile, SignupInputs, SignUpCredentials }
