/**
 * Domain types for the "movie details" feature.
 * Kept separate from the raw API response shape so the UI never depends
 * directly on the wire format.
 */

export interface Streaming {
  watchedPercent: number;
  elapsed: string;
  total: string;
  ready: boolean;
  downloadProgress: number;
}

export interface Movie {
  id: number;
  title: string;
  rating: number;
  year: number;
  duration: string;
  synopsis: string;
  heroImage: string;
  videoPreviewImage: string;
  quality: string;
  genres: string[];
  inMyList: boolean;
  streaming: Streaming;
}

export type MovieId = number | string;

/** Raw shape returned by GET /movies/:id */
export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}