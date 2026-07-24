import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MoviesService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  // Fetch popular movies from TMDB API
  async findAll() {
    const token = this.config.get<string>('TMDB_TOKEN');

    const response = await firstValueFrom(
      this.http.get('https://api.themoviedb.org/3/movie/popular', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    );

    return response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date
        ? Number(movie.release_date.substring(0, 4))
        : 0,
      rating: movie.vote_average,
      tags: [],
      alt: movie.title,
      image:
        `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }));
  }

  // Fetch movie details and credits from TMDB API
  async findOne(id: number) {
    const token = this.config.get<string>("TMDB_TOKEN");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

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
      // Map the TMDB API response to the MovieDetails type
      id: movie.id,
      title: movie.title,
      rating: movie.vote_average,
      year: Number(movie.release_date?.slice(0, 4)),
      duration: `${movie.runtime} min`,
      synopsis: movie.overview,
      heroImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      videoPreviewImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
      quality: "4K",
      genres: movie.genres.map((g: any) => g.name),
      inMyList: false,
      streaming: {
        watchedPercent: 0,
        elapsed: "00:00",
        total: `${movie.runtime}:00`,
        ready: true,
        downloadProgress: 100,
      },
    };
  }
}