import type { AxiosInstance } from "axios"

import type {
  ApiEnvelope,
  AuthSession,
  RegisterCredentials,
  RegistrationResult,
  SignInCredentials,
} from "@/features/auth/auth.types"

type LoginApiResult = {
  access_token: string
}

export interface AuthRepository {
  signIn(credentials: SignInCredentials): Promise<AuthSession>
  register(credentials: RegisterCredentials): Promise<RegistrationResult>
}

export class HttpAuthRepository implements AuthRepository {
  constructor(private readonly httpClient: AxiosInstance) {}

  async signIn(credentials: SignInCredentials): Promise<AuthSession> {
    const response = await this.httpClient.post<ApiEnvelope<LoginApiResult>>(
      "/auth/login",
      credentials
    )

    return { accessToken: response.data.data.access_token }
  }

  async register(
    credentials: RegisterCredentials
  ): Promise<RegistrationResult> {
    const response = await this.httpClient.post<
      ApiEnvelope<RegistrationResult>
    >("/auth/register", credentials)

    return response.data.data
  }
}
