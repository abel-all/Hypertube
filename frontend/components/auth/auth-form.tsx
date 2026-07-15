"use client"

import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

import { GoogleIcon, GitHubIcon } from "@/components/auth/oauth-icons"
import {
  AUTH_FIELDS,
  AUTH_SCREEN_CONTENT,
} from "@/features/auth/auth.config"
import { useAuthTemplate } from "@/features/auth/hooks/use-auth-template"
import type { AuthMode } from "@/features/auth/auth.types"
import { cn } from "@/lib/utils"

type AuthFormProps = {
  mode: AuthMode
}

export default function AuthForm({ mode }: AuthFormProps) {
  const content = AUTH_SCREEN_CONTENT[mode]
  const fields = AUTH_FIELDS[mode]
  const {
    handleTemplateSubmit,
    isPasswordVisible,
    passwordInputType,
    togglePasswordVisibility,
  } = useAuthTemplate()

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-7">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-on-surface transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          className="inline-flex h-12 items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm font-semibold text-on-surface transition-colors hover:border-white/20 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <GitHubIcon />
          GitHub
        </button>
      </div>

      <div className="my-5 flex items-center gap-4" aria-hidden="true">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface/40">
          or continue with
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        onSubmit={handleTemplateSubmit}
      >
        {fields.map((field) => {
          const isPassword = field.type === "password"

          return (
            <div
              key={field.id}
              className={cn(
                "space-y-2",
                field.layout !== "half" && "sm:col-span-2"
              )}
            >
              <label
                htmlFor={field.id}
                className="block text-sm font-semibold text-on-surface/85"
              >
                {field.label}
              </label>
              <div className="relative">
                <input
                  id={field.id}
                  name={field.name}
                  type={isPassword ? passwordInputType : field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 pr-12 text-base text-on-surface caret-primary outline-none transition placeholder:text-on-surface/35 hover:border-white/20 focus:border-primary/70 focus:bg-white/[0.075] focus:ring-4 focus:ring-primary/10"
                />
                {isPassword ? (
                  <button
                    type="button"
                    aria-label={
                      isPasswordVisible ? "Hide password" : "Show password"
                    }
                    aria-pressed={isPasswordVisible}
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-on-surface/45 transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary"
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                ) : null}
              </div>
            </div>
          )
        })}

        {mode === "signin" ? (
          <div className="flex justify-end sm:col-span-2">
            <button
              type="button"
              className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Forgot password?
            </button>
          </div>
        ) : null}

        <button
          type="submit"
          className="mt-1 inline-flex h-12 items-center justify-center rounded-xl bg-primary-container px-5 text-sm font-bold text-on-primary-container shadow-lg shadow-primary-container/20 transition hover:bg-primary-container/90 hover:shadow-primary-container/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-low sm:col-span-2"
        >
          {content.submitLabel}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-on-surface/55">
        {content.alternatePrompt}{" "}
        <Link
          href={content.alternateHref}
          className="font-semibold text-primary transition-colors hover:text-primary/80"
        >
          {content.alternateLabel}
        </Link>
      </p>
    </div>
  )
}
