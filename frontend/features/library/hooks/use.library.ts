"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { libraryService } from "@/features/library/services/library.services"
import { FilterKey, FilterOption, Movie } from "@/features/library/library.types"

const DEBOUNCE_MS = 300

export function useLibrary() {
    const [search, setSearch] = useState("")
    const [genre, setGenre] = useState("")
    const [year, setYear] = useState("")
    const [rating, setRating] = useState("")
    const [language, setLanguage] = useState("")
    const [page, setPage] = useState(1)

    const router = useRouter()
    const searchParams = useSearchParams()

    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState(false)
    const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null)
    const [filterOptions, setFilterOptions] = useState<FilterOption[]>([])

    const currentValues: Record<FilterKey, string> = { genre, year, rating, language }

    function toggleFilter(key: FilterKey) {
        setActiveFilter((current) => (current === key ? null : key))
    }

    function selectFilterValue(key: FilterKey, value: string) {
        const setters: Record<FilterKey, (v: string) => void> = {
            genre: setGenre,
            year: setYear,
            rating: setRating,
            language: setLanguage,
        }

        // clicking the same value again clears it
        setters[key](currentValues[key] === value ? "" : value)
        setPage(1)
        setActiveFilter(null)
    }

    // Fetch filter options once on mount
    useEffect(() => {
        const controller = new AbortController()

        libraryService
            .fetchFilterOptions(controller.signal)
            .then(setFilterOptions)
            .catch((error) => {
                if (!controller.signal.aborted) {
                    console.error(error)
                    setFilterOptions([])
                }
            })

        return () => controller.abort()
    }, [])

    // Fetch movies whenever search/filters/page change
    useEffect(() => {
        const controller = new AbortController()

        const fetchMovies = async () => {
            setLoading(true)
            try {
                const { movies, queryString } = await libraryService.fetchMovies(
                    { search, genre, year, rating, language, page },
                    searchParams,
                    controller.signal
                )
                router.replace(`/library?${queryString}`, { scroll: false })
                setMovies(movies)
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error(error)
                    setMovies([])
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        const timeout = setTimeout(fetchMovies, DEBOUNCE_MS)

        return () => {
            clearTimeout(timeout)
            controller.abort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, genre, year, rating, language, page])

    return {
        search,
        setSearch,
        genre,
        year,
        rating,
        language,
        page,
        setPage,
        movies,
        loading,
        activeFilter,
        filterOptions,
        currentValues,
        toggleFilter,
        selectFilterValue,
    }
}