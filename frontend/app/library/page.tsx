"use client"

import Link from "next/link"
import Footer from "@/components/layout/footer"
import Navbar from "@/components/layout/navbar"
import MovieCard from "@/components/movies/movie-card"
import { cn } from "@/lib/utils"
import { useLibrary } from "@/features/library/hooks/use.library"

import {
    ChevronDown,
    Mic,
    Search,
    SlidersHorizontal,
    Loader2,
} from "lucide-react"

const SKELETON_COUNT = 4

export default function LibraryPage() {
    const {
        search,
        setSearch,
        setPage,
        movies,
        loading,
        activeFilter,
        filterOptions,
        currentValues,
        toggleFilter,
        selectFilterValue,
    } = useLibrary()

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
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value)
                                    setPage(1)
                                }}
                                placeholder="Search movies..."
                                className="w-full bg-transparent outline-none placeholder:text-on-surface-variant"
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
                        {filterOptions.map(({ key, label, options }) => {
                            const isActive = activeFilter === key
                            const currentValue = currentValues[key]

                            return (
                                <div key={key} className="relative">
                                    <button
                                        type="button"
                                        aria-pressed={isActive}
                                        onClick={() => toggleFilter(key)}
                                        className={cn(
                                            "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                                            isActive || currentValue
                                                ? "border-primary/50 bg-white/5 text-primary"
                                                : "border-white/10 bg-white/5 text-on-background hover:bg-white/10"
                                        )}
                                    >
                                        {currentValue || label}
                                        <ChevronDown className="size-4" />
                                    </button>

                                    {isActive && (
                                        <div className="absolute left-0 top-full z-10 mt-2 min-w-[10rem] rounded-xl border border-white/10 bg-[#1A1A1C] p-1 shadow-lg">
                                            {options.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => selectFilterValue(key, option)}
                                                    className={cn(
                                                        "block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/10",
                                                        currentValue === option && "text-primary"
                                                    )}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
                    {movies.map((movie) => {
                        const movieId = movie.id ?? movie.title

                        return (
                            <Link
                                key={movieId}
                                href={`/library/${encodeURIComponent(String(movieId))}`}
                                className="block"
                            >
                                <MovieCard
                                    movie={movie}
                                    watched={movie.watched}
                                    imageUrl={movie.image}
                                />
                            </Link>
                        )
                    })}

                    {loading &&
                        Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                aria-hidden="true"
                                className="skeleton aspect-[2/3] overflow-hidden rounded-xl bg-[#1A1A1C]"
                            />
                        ))}
                </section>

                {loading && (
                    <div
                        role="status"
                        aria-live="polite"
                        className="flex items-center justify-center gap-3 py-6 text-on-surface-variant"
                    >
                        <Loader2 className="size-6 animate-spin text-primary" />
                        <span className="text-sm font-semibold">Loading more titles...</span>
                    </div>
                )}

                {!loading && movies.length === 0 && (
                    <p className="py-10 text-center text-sm text-on-surface-variant">
                        No movies found. Try adjusting your search or filters.
                    </p>
                )}
            </main>
            <Footer />
        </div>
    )
}