import api from "@/lib/axios"
import { FilterOption, Movie } from "@/features/library/library.types"

export const libraryRepository = {
    async getFilters(signal?: AbortSignal): Promise<FilterOption[]> {
        const response = await api.get("/filters", { signal })
        const data = response.data

        if (Array.isArray(data)) return data
        if (Array.isArray(data?.data)) return data.data
        if (Array.isArray(data?.filters)) return data.filters

        console.error("Unexpected /filters response shape:", data)
        return []
    },

    async getMovies(queryString: string, signal?: AbortSignal): Promise<Movie[]> {
        const response = await api.get(`/movies/?${queryString}`, { signal })
        const data = response.data

        if (Array.isArray(data)) return data
        if (Array.isArray(data?.data)) return data.data
        if (Array.isArray(data?.results)) return data.results

        console.error("Unexpected /movies response shape:", data)
        return []
    },
}