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
});