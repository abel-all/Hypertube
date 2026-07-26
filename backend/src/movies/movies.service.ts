import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { FindAllParams } from './type';

@Injectable()
export class MoviesService {
  private genreMapCache: Map<string, number> | null = null;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private get headers() {
    return { Authorization: `Bearer ${this.config.get<string>('TMDB_TOKEN')}` };
  }

  // Genre names -> TMDB genre IDs, cached after first fetch
  private async getGenreMap(): Promise<Map<string, number>> {
    if (this.genreMapCache) return this.genreMapCache;

    const response = await firstValueFrom(
      this.http.get('https://api.themoviedb.org/3/genre/movie/list', {
        headers: this.headers,
      }),
    );

    this.genreMapCache = new Map(
      response.data.genres.map((g: any) => [g.name.toLowerCase(), g.id]),
    );
    return this.genreMapCache;
  }

  async findAll(params: FindAllParams = {}) {
    const { search, genre, year, rating, language, page = 1 } = params;
    const hasSearch = Boolean(search?.trim());

    let url: string;
    const queryParams: Record<string, any> = { page };

    if (hasSearch) {
      url = 'https://api.themoviedb.org/3/search/movie';
      queryParams.query = search!.trim();
      queryParams.include_adult = false;
      if (year) queryParams.primary_release_year = year;
      if (language) queryParams.with_original_language = language;
    } else {
      url = 'https://api.themoviedb.org/3/discover/movie';
      if (genre) {
        const genreMap = await this.getGenreMap();
        const genreId = genreMap.get(genre.toLowerCase());
        if (genreId) queryParams.with_genres = genreId;
      }
      if (year) queryParams.primary_release_year = year;
      if (rating) queryParams['vote_average.gte'] = Number(rating);
      if (language) queryParams.with_original_language = language;
    }

    const response = await firstValueFrom(
      this.http.get(url, { headers: this.headers, params: queryParams }),
    );

    return {
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
      results: response.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date
          ? Number(movie.release_date.substring(0, 4))
          : 0,
        rating: movie.vote_average,
        tags: [],
        alt: movie.title,
        image: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      })),
    };
  }

  async findOne(id: number) {
    const headers = this.headers;

    const [movieRes, creditsRes] = await Promise.all([
      firstValueFrom(
        this.http.get(`https://api.themoviedb.org/3/movie/${id}`, { headers }),
      ),
      firstValueFrom(
        this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          headers,
        }),
      ),
    ]);

    const movie = movieRes.data;

    return {
      id: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      year: Number(movie.release_date?.slice(0, 4)),
      duration: `${movie.runtime} min`,
      synopsis: movie.overview,
      heroImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      videoPreviewImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      quality: '4K',
      genres: movie.genres.map((g: any) => g.name),
      inMyList: false,
      //-----------------------------
      streaming: {
        watchedPercent: 0,
        elapsed: '00:00',
        total: `${movie.runtime}:00`,
        ready: true,
        downloadProgress: 100,
      },
    };
  }
}