/**
 * Minimal HTTP client wrapper around fetch.
 * Centralizes base URL, error handling, and JSON parsing so individual
 * services don't repeat this boilerplate.
 */

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

export interface HttpClientOptions {
  baseUrl?: string;
}

export class HttpClient {
  private readonly baseUrl: string;

  constructor({ baseUrl = "http://localhost:8080" }: HttpClientOptions = {}) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string, signal?: AbortSignal): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, { signal });

    if (!res.ok) {
      throw new HttpError(res.status, `GET ${path} failed with status ${res.status}`);
    }

    return (await res.json()) as T;
  }
}

/** Default, app-wide instance. Override baseUrl per-environment if needed. */
export const httpClient = new HttpClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080",
});import { movieService, MovieService } from "../services/details.service";
import type { Movie, MovieId } from "../details.types";

/**
 * Repository layer: the single source of truth the app talks to for movie data.
 * Adds caching and any cross-cutting concerns (e.g. optimistic local updates)
 * on top of the raw service, and is what hooks/components should depend on
 * instead of the service directly. Swappable for tests or a different data
 * source without touching UI code.
 */
export interface IMovieRepository {
  getById(id: MovieId, opts?: { forceRefresh?: boolean }): Promise<Movie>;
  setInMyList(id: MovieId, inMyList: boolean): void;
  clearCache(id?: MovieId): void;
}

export class MovieRepository implements IMovieRepository {
  private cache = new Map<string, Movie>();

  constructor(private readonly service: MovieService = movieService) {}

  async getById(id: MovieId, opts: { forceRefresh?: boolean } = {}): Promise<Movie> {
    const key = String(id);

    if (!opts.forceRefresh && this.cache.has(key)) {
      return this.cache.get(key) as Movie;
    }

    const movie = await this.service.getMovieById(id);
    this.cache.set(key, movie);
    return movie;
  }

  /** Optimistic local update; doesn't call the API (no PATCH endpoint provided). */
  setInMyList(id: MovieId, inMyList: boolean): void {
    const key = String(id);
    const cached = this.cache.get(key);
    if (cached) {
      this.cache.set(key, { ...cached, inMyList });
    }
  }

  clearCache(id?: MovieId): void {
    if (id === undefined) {
      this.cache.clear();
    } else {
      this.cache.delete(String(id));
    }
  }
}

export const movieRepository = new MovieRepository();