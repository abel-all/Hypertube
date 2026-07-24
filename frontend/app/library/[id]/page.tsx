"use client"

import { useParams } from "next/navigation"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import { useMovieDetails } from "@/features/library/details/hooks/use.details"

import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Download,
    Globe,
    Maximize,
    Play,
    Plus,
    Settings,
    Star,
    Volume2,
} from "lucide-react"

export default function MovieDetailsPage() {
    const params = useParams<{ id: string }>()
    const { movie, loading, error, toggleMyList, togglingMyList } = useMovieDetails(params.id)

    if (loading) {
        return (
            <div className="dark flex min-h-screen flex-col bg-background text-on-background">
                <Navbar />
                <main className="flex flex-grow items-center justify-center pt-[80px]">
                    <div className="skeleton h-[400px] w-full max-w-4xl rounded-xl bg-surface-container-high" />
                </main>
                <Footer />
            </div>
        )
    }

    if (error || !movie) {
        return (
            <div className="dark flex min-h-screen flex-col bg-background text-on-background">
                <Navbar />
                <main className="flex flex-grow items-center justify-center pt-[80px]">
                    <p className="text-on-surface-variant">
                        {error ?? "Movie not found."}
                    </p>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="dark flex min-h-screen flex-col bg-background text-on-background antialiased">
            <Navbar />

            <main className="flex flex-grow flex-col pt-[80px]">
                {/* Hero Section */}
                <section className="relative flex h-[614px] w-full items-end px-margin-mobile pb-lg md:h-[819px] md:px-margin-desktop">
                    <div className="absolute inset-0 z-0">
                        <div
                            className="h-full w-full bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('${movie.heroImage}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                        <div className="absolute inset-0 w-2/3 bg-gradient-to-r from-background via-background/50 to-transparent" />
                    </div>

                    <div className="relative z-10 flex w-full max-w-4xl flex-col gap-md">
                        <h1
                            className="font-display-sm text-display-sm text-on-background md:font-display-lg md:text-display-lg"
                            style={{ textShadow: "0 0 20px rgba(229, 9, 20, 0.5)" }}
                        >
                            {movie.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-sm font-label-md text-label-md text-on-surface-variant">
                            <div className="flex items-center gap-xs text-primary">
                                <Star className="size-4 fill-current" />
                                <span className="font-bold">{movie.rating.toFixed(1)}</span>
                            </div>
                            <span>•</span>
                            <span>{movie.year}</span>
                            <span>•</span>
                            <span>{movie.duration}</span>
                            <span>•</span>
                            <div className="flex gap-2">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre}
                                        className="rounded border border-white/20 bg-white/[0.03] px-2 py-0.5 backdrop-blur-xl"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            {movie.quality && (
                                <span className="ml-2 rounded border border-white/40 px-2 py-0.5 font-bold">
                                    {movie.quality}
                                </span>
                            )}
                        </div>

                        <p className="max-w-2xl font-body-md text-body-md text-on-surface line-clamp-3 md:line-clamp-none">
                            {movie.synopsis}
                        </p>

                        <div className="mt-sm flex gap-md">
                            <button
                                type="button"
                                className="flex items-center gap-xs rounded px-xl py-3 font-label-md text-label-md text-white transition-colors bg-primary-container hover:bg-primary-container/90"
                                style={{ boxShadow: "0 0 20px rgba(229,9,20,0.4)" }}
                            >
                                <Play className="size-5 fill-current" />
                                PLAY NOW
                            </button>
                            <button
                                type="button"
                                onClick={toggleMyList}
                                disabled={togglingMyList}
                                className="flex items-center gap-xs rounded border border-white/10 bg-white/[0.03] px-md py-3 font-label-md text-label-md text-on-background backdrop-blur-xl transition-colors hover:bg-white/10 disabled:opacity-60"
                            >
                                <Plus className="size-5" />
                                {movie.inMyList ? "IN MY LIST" : "MY LIST"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Streaming / Player Placeholder */}
                <section className="px-margin-mobile py-xl md:px-margin-desktop">
                    <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-surface-container-lowest shadow-2xl">
                        {movie.videoPreviewImage && (
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-500 group-hover:opacity-20"
                                style={{ backgroundImage: `url('${movie.videoPreviewImage}')` }}
                            />
                        )}

                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div className="flex size-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-primary-container opacity-80 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:opacity-100">
                                <Play className="size-9 fill-current" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 flex w-full flex-col gap-sm bg-gradient-to-t from-black/90 to-transparent p-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <div className="h-1 w-full cursor-pointer overflow-hidden rounded-full bg-white/20">
                                <div
                                    className="h-full bg-primary-container"
                                    style={{ width: `${movie.streaming.watchedPercent}%` }}
                                />
                            </div>
                            <div className="flex items-center justify-between text-white">
                                <div className="flex items-center gap-md">
                                    <Play className="size-5 cursor-pointer fill-current transition-colors hover:text-primary-container" />
                                    <Volume2 className="size-5 cursor-pointer transition-colors hover:text-primary-container" />
                                    <span className="font-label-md text-label-md">
                                        {movie.streaming.elapsed} / {movie.streaming.total}
                                    </span>
                                </div>
                                <div className="flex items-center gap-md">
                                    <span className="cursor-pointer rounded border border-white/30 px-2 py-1 font-label-sm text-label-sm hover:bg-white/10">
                                        SUB
                                    </span>
                                    <Settings className="size-5 cursor-pointer transition-colors hover:text-primary-container" />
                                    <Maximize className="size-5 cursor-pointer transition-colors hover:text-primary-container" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute right-sm top-sm flex gap-2">
                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-xl">
                                <div
                                    className={`size-2 rounded-full ${
                                        movie.streaming.ready ? "animate-pulse bg-emerald-500" : "bg-white/30"
                                    }`}
                                />
                                <span className="font-label-sm text-label-sm text-on-surface">
                                    {movie.streaming.ready ? "Ready to Stream" : "Preparing..."}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-xl">
                                <Download className="size-[14px]" />
                                <span className="font-label-sm text-label-sm text-on-surface">
                                    {movie.streaming.downloadProgress}%
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    )
}

function DetailCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-md backdrop-blur-xl">
            <p className="mb-1 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                {label}
            </p>
            <p className="font-body-md text-body-md text-on-surface">{value}</p>
        </div>
    )
}