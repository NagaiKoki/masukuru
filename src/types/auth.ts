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

export type ThirdPartySignInType = {
  method: AuthMethodType
  type: ThirdPartyAuth
}

export type SuccessThirdPartySignInType = {
  method: AuthMethodType
  hasAccount: boolean
}

export type ThirdPartyAuth = 'apple' | 'google'
export type UserStatusType = 'unauthorized' | 'authorized' | 'tutorial' | ''
export type AuthMethodType = 'signup' | 'signin'