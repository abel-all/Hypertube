"use client"

import { useCallback, useEffect, useState } from "react"
import { movieService } from "@/features/library/details/services/details.service"
import { MovieDetails } from "@/features/library/details/details.types"

export function useMovieDetails(movieId: string | number) {
    const [movie, setMovie] = useState<MovieDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [togglingMyList, setTogglingMyList] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        const fetchDetails = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await movieService.fetchMovieDetails(movieId, controller.signal)
                setMovie(data)
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error(err)
                    setError("Failed to load movie details.")
                    setMovie(null)
                }
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        fetchDetails()

        return () => controller.abort()
    }, [movieId])

    const toggleMyList = useCallback(async () => {
        if (!movie || togglingMyList) return

        const nextValue = !movie.inMyList
        setTogglingMyList(true)
        setMovie((current) => (current ? { ...current, inMyList: nextValue } : current))

        try {
            await movieService.updateMyListStatus(movie.id, nextValue)
        } catch (err) {
            console.error(err)
            // revert the optimistic update on failure
            setMovie((current) => (current ? { ...current, inMyList: !nextValue } : current))
        } finally {
            setTogglingMyList(false)
        }
    }, [movie, togglingMyList])

    return { movie, loading, error, toggleMyList, togglingMyList }
}