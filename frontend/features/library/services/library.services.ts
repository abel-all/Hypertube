import { libraryRepository } from "@/features/library/repositories/library.repositories"
import { FilterOption, LibraryFilters, Movie } from "@/features/library/library.types"

export const libraryService = {
    async fetchFilterOptions(signal?: AbortSignal): Promise<FilterOption[]> {
        return libraryRepository.getFilters(signal)
    },

    async fetchMovies(
        filters: LibraryFilters,
        existingParams: URLSearchParams,
        signal?: AbortSignal
    ): Promise<{ movies: Movie[]; queryString: string }> {
        const params = buildQueryParams(filters, existingParams)
        const queryString = params.toString()
        const movies = await libraryRepository.getMovies(queryString, signal)
        return { movies, queryString }
    },
}

function buildQueryParams(
    filters: LibraryFilters,
    existingParams: URLSearchParams
): URLSearchParams {
    const params = new URLSearchParams(existingParams.toString())
    const { search, genre, year, rating, language, page } = filters

    if (search.trim()) params.set("search", search.trim())
    else params.delete("search")

    if (genre) params.set("genre", genre)
    else params.delete("genre")

    if (year) params.set("year", year)
    else params.delete("year")

    if (rating) params.set("rating", rating)
    else params.delete("rating")

    if (language) params.set("language", language)
    else params.delete("language")

    params.set("page", String(page))

    return params
}