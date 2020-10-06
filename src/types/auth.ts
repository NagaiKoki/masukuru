export interface AuthState {
  isLoading: boolean
  error: string
  userStatus: UserStatusType
}

export type EmailSignInType = {
  email: string
  password: string
  method: AuthMethodType
}

export type UserStatusType = 'unauthorized' | 'authorized' | 'tutorial' | ''
export type AuthMethodType = 'signup' | 'signin'