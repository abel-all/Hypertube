import { httpClient, HttpClient } from "./httpClient";
import type { ApiResponse, Movie, MovieId } from "../details.types";

/**
 * Service layer: knows the API's URL shape and response envelope.
 * Returns the raw domain object (unwrapped from { statusCode, message, data }).
 * Does not know about React, hooks, or UI state.
 */
export class MovieService {
  constructor(private readonly client: HttpClient = httpClient) {}

  async getMovieById(id: MovieId, signal?: AbortSignal): Promise<Movie> {
    const response = await this.client.get<ApiResponse<Movie>>(`/movies/${id}`, signal);
    return response.data;
  }
}

export const movieService = new MovieService();