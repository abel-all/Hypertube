"use client"

import { useCallback, useEffect, useState } from "react";
import { movieRepository, IMovieRepository } from "../repositories/details.repository";
import type { Movie, MovieId } from "../details.types";

export interface UseMovieResult {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
  inMyList: boolean;
  toggleMyList: () => void;
  refetch: () => void;
}

/**
 * Hook layer: the only place that owns React state for a single movie.
 * Components should use this instead of calling the repository/service
 * directly, so the data-fetching concern stays out of the view.
 */
export function useMovie(movieId: MovieId, repository: IMovieRepository = movieRepository): UseMovieResult {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inMyList, setInMyList] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = await repository.getById(movieId, { forceRefresh: refreshToken > 0 });
        if (!cancelled) {
          setMovie(result);
          setInMyList(result.inMyList);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load movie");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, refreshToken]);

  const toggleMyList = useCallback(() => {
    setInMyList((prev) => {
      const next = !prev;
      repository.setInMyList(movieId, next);
      return next;
    });
  }, [movieId, repository]);

  const refetch = useCallback(() => {
    setRefreshToken((t) => t + 1);
  }, []);

  return { movie, loading, error, inMyList, toggleMyList, refetch };
}