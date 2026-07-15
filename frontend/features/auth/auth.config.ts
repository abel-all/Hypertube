import type { AuthMode } from "@/features/auth/auth.types"

export type AuthField = {
  id: string
  label: string
  name: string
  type: "text" | "email" | "password"
  autoComplete: string
  placeholder: string
  layout?: "half"
}

type AuthScreenContent = {
  eyebrow: string
  title: string
  description: string
  submitLabel: string
  alternatePrompt: string
  alternateLabel: string
  alternateHref: string
}

export const AUTH_SCREEN_CONTENT: Record<AuthMode, AuthScreenContent> = {
  signin: {
    eyebrow: "Welcome back",
    title: "Your next story is waiting.",
    description:
      "Sign in to continue watching, revisit your list, and discover something unforgettable.",
    submitLabel: "Sign in",
    alternatePrompt: "New to HTube?",
    alternateLabel: "Create an account",
    alternateHref: "/register",
  },
  register: {
    eyebrow: "Join the story",
    title: "Make movie night yours.",
    description:
      "Create your profile and build a library shaped around everything you love to watch.",
    submitLabel: "Create account",
    alternatePrompt: "Already have an account?",
    alternateLabel: "Sign in",
    alternateHref: "/signin",
  },
}

export const AUTH_FIELDS: Record<AuthMode, AuthField[]> = {
  signin: [
    {
      id: "signin-username",
      label: "Username",
      name: "username",
      type: "text",
      autoComplete: "username",
      placeholder: "Enter your username",
    },
    {
      id: "signin-password",
      label: "Password",
      name: "password",
      type: "password",
      autoComplete: "current-password",
      placeholder: "Enter your password",
    },
  ],
  register: [
    {
      id: "register-username",
      label: "Username",
      name: "username",
      type: "text",
      autoComplete: "username",
      placeholder: "Choose a username",
    },
    {
      id: "register-email",
      label: "Email",
      name: "email",
      type: "email",
      autoComplete: "email",
      placeholder: "you@example.com",
    },
    {
      id: "register-first-name",
      label: "First name",
      name: "firstName",
      type: "text",
      autoComplete: "given-name",
      placeholder: "First name",
      layout: "half",
    },
    {
      id: "register-last-name",
      label: "Last name",
      name: "lastName",
      type: "text",
      autoComplete: "family-name",
      placeholder: "Last name",
      layout: "half",
    },
    {
      id: "register-password",
      label: "Password",
      name: "password",
      type: "password",
      autoComplete: "new-password",
      placeholder: "Create a password",
    },
  ],
}
