"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe, Check, User, LogOut, UserCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
}

type Language = {
  code: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/library" },
  { label: "Series", href: "/series" },
  { label: "My List", href: "/my-list" },
]

const LANGUAGES: Language[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "ar", label: "العربية" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>(LANGUAGES[0])
  const langRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside of them
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleLogout() {
    setIsProfileOpen(false)
    // TODO: hook this into your auth logic (e.g. signOut() from next-auth, clearing a session cookie, etc.)
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-surface/30 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-16">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-black tracking-[-0.08em] text-primary-container md:text-3xl"
          >
            HTube
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = pathname === href

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "pb-1 text-sm transition-colors",
                    isActive
                      ? "border-b-2 border-primary text-primary"
                      : "text-on-surface/70 hover:text-on-surface"
                  )}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              type="button"
              aria-label="Change language"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="text-on-surface/80 transition-colors hover:text-primary"
            >
              <Globe className="size-5" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 min-w-[10rem] rounded-xl border border-white/10 bg-[#1A1A1C] p-1 shadow-lg">
                {LANGUAGES.map((lang) => {
                  const isSelected = currentLang.code === lang.code

                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        setCurrentLang(lang)
                        setIsLangOpen(false)
                        // TODO: hook this into your i18n logic (e.g. next-intl, next-i18next)
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10",
                        isSelected ? "text-primary" : "text-on-surface"
                      )}
                    >
                      {lang.label}
                      {isSelected && <Check className="size-4" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              aria-label="Open profile menu"
              aria-expanded={isProfileOpen}
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="text-on-surface/80 transition-colors hover:text-primary"
            >
              <User className="size-5" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 min-w-[10rem] rounded-xl border border-white/10 bg-[#1A1A1C] p-1 shadow-lg">
                <Link
                  href="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-on-surface hover:bg-white/10"
                >
                  <UserCircle className="size-4" />
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-on-surface hover:bg-white/10"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}