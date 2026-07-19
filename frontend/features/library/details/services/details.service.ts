import { movieRepository } from "@/features/library/details/repositories/details.repository"
import { MovieDetails } from "@/features/library/details/details.types"

export const movieService = {
    async fetchMovieDetails(id: string | number, signal?: AbortSignal): Promise<MovieDetails> {
        return movieRepository.getMovieById(id, signal)
    },

    async updateMyListStatus(
        id: string | number,
        inMyList: boolean,
        signal?: AbortSignal
    ): Promise<void> {
        return movieRepository.setMyListStatus(id, inMyList, signal)
    },
}