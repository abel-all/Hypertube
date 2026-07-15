import Image from "next/image"
import Link from "next/link"
import { Clapperboard } from "lucide-react"

import AuthForm from "@/components/auth/auth-form"
import { AUTH_SCREEN_CONTENT } from "@/features/auth/auth.config"
import type { AuthMode } from "@/features/auth/auth.types"

type AuthScreenProps = {
  mode: AuthMode
}

export default function AuthScreen({ mode }: AuthScreenProps) {
  const content = AUTH_SCREEN_CONTENT[mode]

  return (
    <div className="dark relative min-h-dvh overflow-hidden bg-surface-container-lowest text-on-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-1/4 size-[28rem] rounded-full bg-primary-container/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 size-80 rounded-full bg-secondary/5 blur-[120px]"
      />

      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 md:px-10 xl:px-16">
          <Link
            href="/library"
            aria-label="HTube library"
            className="text-2xl font-black tracking-[-0.08em] text-primary-container md:text-3xl"
          >
            HTube
          </Link>
          <Link
            href="/library"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-on-surface/65 backdrop-blur-xl transition-colors hover:border-primary/40 hover:text-primary"
          >
            Explore library
          </Link>
        </div>
      </header>

      <main className="mx-auto grid min-h-dvh max-w-[1600px] pt-20 lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1.12fr)]">
        <section className="relative z-10 flex items-center justify-center px-4 py-10 sm:px-8 lg:px-10 xl:px-16">
          <div className="w-full max-w-[530px]">
            <div className="mb-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                <Clapperboard className="size-4" />
                {content.eyebrow}
              </div>
              <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-[-0.035em] text-on-surface sm:text-5xl">
                {content.title}
              </h1>
              <p className="mt-4 max-w-lg text-base leading-7 text-on-surface/55 sm:text-lg">
                {content.description}
              </p>
            </div>

            <AuthForm mode={mode} />

            <p className="mt-5 text-center text-xs leading-5 text-on-surface/35">
              By continuing, you agree to HTube&apos;s{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="relative hidden p-5 pl-0 lg:block xl:p-8 xl:pl-0">
          <div className="relative h-full min-h-[680px] overflow-hidden rounded-[2rem] border border-white/10 bg-surface-container-low shadow-2xl shadow-black/50">
            <Image
              src={"/hero-section-image.jpg"}
              alt="An astronaut exploring a distant cinematic landscape"
              fill
              priority
              sizes="(min-width: 1280px) 55vw, 50vw"
              className="object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/25 via-transparent to-transparent" />
          </div>
        </section>
      </main>
    </div>
  )
}
