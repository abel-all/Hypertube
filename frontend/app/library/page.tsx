"use client"

import { useState } from "react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import MovieCard from "@/components/movie-card"
import { cn } from "@/lib/utils"

import {
    ChevronDown,
    Mic,
    Search,
    SlidersHorizontal,
    Loader2,
} from "lucide-react"

type FilterKey = "genre" | "year" | "rating" | "language"

type FilterOption = {
    key: FilterKey
    label: string
}

const FILTER_OPTIONS: FilterOption[] = [
    { key: "genre", label: "Genre" },
    { key: "year", label: "Year" },
    { key: "rating", label: "Rating: 8+" },
    { key: "language", label: "Language" },
]

type Movie = {
    title: string
    year: string
    rating: string
    tags: string[]
    image: string
    alt: string
    watched?: boolean
}

const MOVIES: Movie[] = [
    {
        title: "Stellar Drift",
        year: "2024",
        rating: "8.9",
        tags: ["Sci-Fi", "Drama"],
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDn5nQT8_rybq1224lgK77af99UP2MrxCeVm_eBLBYIp1IX_dZaV_-Q6xmjlCvnC8DH3AaOs4o863SruJmbBoiIAYV-4Oz1_l0Xb20vB79pTDcxdCFD1g6WiDwLIwWIdp0-WHnX4LaejZNZd-8ldZDKAw0g2EgV1lG1AI9A8606GVtcj8XySl2EUinTkp95SeHihOaVzRNwT7FjSICBkiYDOEsVGOToNeFNfD4Fb0FN0zZtlLowkBgIiJMZ9Ua3VOx_mYHZdP85EpFx",
        alt: "A cinematic movie poster featuring a solitary astronaut standing on a desolate, dark alien landscape.",
    },
    {
        title: "Neon Echoes",
        year: "2023",
        rating: "7.4",
        tags: [],
        watched: true,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB8S01LCrcIgcqKk50rF649ur-7Db6-XIVr0DpVjMqLzcUll8Yi9dU1zbrOtjBvjwl2YGhEoKw38qctpcGaho14csOu5MXbbgW5Iyr5-_pBqcWIYe1ijO8q2RmUH1bvANUzPLUVlnsq7Ee_WkoaPkeqKaK9joT8JV8dPtUvTID2e3WN4ILXPK1arnWCHqtfwplIiuKZ8JVm60AGbWUJfSTxZHEWgaKIp5xhzRd57BbJ1RSPaHKhVKL_EsF5yj4Y4jgk11LzDatQF3y7",
        alt: "A brooding, cinematic movie poster showing a rain-slicked cyberpunk city street at night.",
    },
]

const SKELETON_COUNT = 4

export default function LibraryPage() {
    // Which filter chip is toggled on. Starts with "rating" active to match the original design.
    const [activeFilter, setActiveFilter] = useState<FilterKey | null>("rating")

    function toggleFilter(key: FilterKey) {
        setActiveFilter((current) => (current === key ? null : key))
    }

    return (
        <div className="dark flex min-h-screen flex-col bg-background text-on-background">
            <Navbar />

            <main className="flex-grow px-4 pb-12 pt-24 md:px-16">
                <header className="mb-12 space-y-8 pt-2">
                    <div className="mx-auto max-w-4xl">
                        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl focus-within:ring-2 focus-within:ring-primary/80">
                            <Search className="size-6 shrink-0 text-on-surface-variant" />
                            <input
                                type="text"
                                placeholder="Search movies, genres, or directors..."
                                className="w-full border-0 bg-transparent text-base text-on-background placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-0 md:text-lg"
                            />
                            <button
                                type="button"
                                aria-label="Voice search"
                                className="text-on-surface-variant transition-colors hover:text-primary"
                            >
                                <Mic className="size-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
                        {FILTER_OPTIONS.map(({ key, label }) => {
                            const isActive = activeFilter === key

                            return (
                                <button
                                    key={key}
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => toggleFilter(key)}
                                    className={cn(
                                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                                        isActive
                                            ? "border-primary/50 bg-white/5 text-primary"
                                            : "border-white/10 bg-white/5 text-on-background hover:bg-white/10"
                                    )}
                                >
                                    {label}
                                    <ChevronDown className="size-4" />
                                </button>
                            )
                        })}

                        <div className="hidden h-6 w-px bg-white/10 md:block" />

                        <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-on-background transition-colors hover:bg-white/10"
                        >
                            <SlidersHorizontal className="size-4" />
                            Sort by: Latest
                        </button>
                    </div>
                </header>

                <section className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
                    {MOVIES.map((movie) => (
                        <MovieCard key={movie.title} movie={movie} watched={movie.watched} />
                    ))}

                    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                        <div
                            key={`skeleton-${index}`}
                            aria-hidden="true"
                            className="skeleton aspect-[2/3] overflow-hidden rounded-xl bg-[#1A1A1C]"
                        />
                    ))}
                </section>

                <div
                    role="status"
                    aria-live="polite"
                    className="flex items-center justify-center gap-3 py-6 text-on-surface-variant"
                >
                    <Loader2 className="size-6 animate-spin text-primary" />
                    <span className="text-sm font-semibold">Loading more titles...</span>
                </div>
            </main>

            <Footer />
        </div>
    )
}