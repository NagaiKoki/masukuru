export interface AuthState {
  isLoading: boolean
  error: string
  isLogggedIn: boolean
}

export type EmailSignInType = {
  email: string
  password: string
}