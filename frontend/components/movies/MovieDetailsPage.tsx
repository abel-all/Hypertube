"use client";

import { useMovie } from "@/features/library/details/hooks/use.details";
import type { MovieId } from "@/features/library/details/details.types";
import { MovieDetailsView } from "./MovieDetailsView";
import { MovieDetailsLoading, MovieDetailsError } from "./MovieDetailsStates";

export interface MovieDetailsPageProps {
  movieId: MovieId;
}

/**
 * Container component: the only place in the tree that calls the hook.
 * Chooses which state to render, then hands plain props down to the
 * presentational view. Swap this file if you move from client-side fetching
 * to server-side props/loaders — MovieDetailsView never has to change.
 */
export function MovieDetailsPage({ movieId }: MovieDetailsPageProps) {
  const { movie, loading, error, inMyList, toggleMyList, refetch } = useMovie(movieId);

  if (loading) return <MovieDetailsLoading />;
  if (error || !movie) return <MovieDetailsError message={error ?? "Unknown error"} onRetry={refetch} />;

  return <MovieDetailsView movie={movie} inMyList={inMyList} onToggleMyList={toggleMyList} />;
}

export default MovieDetailsPage;