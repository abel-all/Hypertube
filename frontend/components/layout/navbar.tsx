"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/library" },
  { label: "Series", href: "/series" },
  { label: "My List", href: "/my-list" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-surface/30 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-4 py-4 md:px-16">
        <div className="flex items-center gap-10">
          <Link
            href="/library"
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
          <button
            type="button"
            aria-label="Change language"
            className="text-on-surface/80 transition-colors hover:text-primary"
          >
            <Globe className="size-5" />
          </button>

          <button
            type="button"
            aria-label="Open profile"
            className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-surface-container-high transition-transform duration-200 hover:scale-105 hover:bg-white/10"
          >
            <Image
              alt="User profile avatar"
              className="object-cover"
              src="/avatar.jpg"
              fill
              sizes="40px"
            />
          </button>
        </div>
      </div>
    </nav>
  )
}