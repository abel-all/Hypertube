import api from "@/lib/axios"
import { MovieDetails } from "@/features/library/details/details.types"

export const movieRepository = {
    async getMovieById(id: string | number, signal?: AbortSignal): Promise<MovieDetails> {
        const response = await api.get(`/movies/${id}`, { signal })
        const data = response.data
        const movie = data?.id !== undefined ? data : data?.data

        if (!movie || movie.id === undefined) {
            throw new Error("Unexpected movie details response shape")
        }

        return movie as MovieDetails
    },

    async setMyListStatus(
        id: string | number,
        inMyList: boolean,
        signal?: AbortSignal
    ): Promise<void> {
        await api.post(`/movies/${id}/my-list`, { inMyList }, { signal })
    },
}