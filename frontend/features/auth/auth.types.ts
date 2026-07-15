export type AuthMode = "signin" | "register"

export type OAuthProvider = "google" | "github"

export type SignInCredentials = {
  username: string
  password: string
}

export type RegisterCredentials = {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
}

export type AuthSession = {
  accessToken: string
}

export type RegistrationResult = {
  message: string
}

export type ApiEnvelope<T> = {
  statusCode: number
  message: string
  data: T
}
