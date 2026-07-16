import Link from "next/link"

const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Cookie Preferences", href: "#" },
]

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-white/5 bg-surface text-on-surface">
      <div className="flex flex-col items-center justify-between gap-6 px-4 py-8 text-sm md:flex-row md:px-16">
        <div className="text-xl font-bold text-primary md:text-2xl">HTube</div>

        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-on-surface-variant/80 transition-colors hover:text-primary hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="text-center text-xs text-on-surface-variant/80 md:text-right">
          © 2024 HTube Premium Streaming. All rights reserved.
        </div>
      </div>
    </footer>
  )
}