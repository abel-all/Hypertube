// filters.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FiltersService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async getFilters() {
    const token = this.config.get<string>('TMDB_TOKEN');
    const response = await firstValueFrom(
      this.http.get('https://api.themoviedb.org/3/genre/movie/list', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    const genreOptions: string[] = response.data.genres.map((g: any) => g.name);

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 15 }, (_, i) => String(currentYear - i));

    const ratingOptions = ['9', '8', '7', '6', '5'];

    const languageOptions = ['en', 'fr', 'es', 'ja', 'ko', 'de'];

    return [
      { key: 'genre', label: 'Genre', options: genreOptions },
      { key: 'year', label: 'Year', options: yearOptions },
      { key: 'rating', label: 'Rating', options: ratingOptions },
      { key: 'language', label: 'Language', options: languageOptions },
    ];
  }
}