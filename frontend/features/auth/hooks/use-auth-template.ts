"use client"

import { useState, type FormEvent } from "react"

export function useAuthTemplate() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  function togglePasswordVisibility() {
    setIsPasswordVisible((isVisible) => !isVisible)
  }

  function handleTemplateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return {
    handleTemplateSubmit,
    isPasswordVisible,
    passwordInputType: isPasswordVisible ? "text" : "password",
    togglePasswordVisibility,
  } as const
}
