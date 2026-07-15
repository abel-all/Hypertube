import type {
  RegisterCredentials,
  SignInCredentials,
} from "@/features/auth/auth.types"
import type { AuthRepository } from "@/features/auth/repositories/auth.repository"

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  signIn(credentials: SignInCredentials) {
    return this.authRepository.signIn({
      username: credentials.username.trim(),
      password: credentials.password,
    })
  }

  register(credentials: RegisterCredentials) {
    return this.authRepository.register({
      username: credentials.username.trim(),
      email: credentials.email.trim().toLowerCase(),
      firstName: credentials.firstName.trim(),
      lastName: credentials.lastName.trim(),
      password: credentials.password,
    })
  }
}
