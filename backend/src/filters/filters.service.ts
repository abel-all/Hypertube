import { Injectable } from '@nestjs/common';
import { FilterOptionDto } from './dto/filter-option.dto';

@Injectable()
export class FiltersService {
  getFilters(): FilterOptionDto[] {
    return [
      {
        key: 'genre',
        label: 'Genre',
        options: ['Action', 'Drama', 'Sci-Fi', 'Comedy', 'Horror', 'Romance'],
      },
      {
        key: 'year',
        label: 'Year',
        options: ['2026', '2025', '2024', '2023', '2022', '2021'],
      },
      {
        key: 'rating',
        label: 'Rating',
        options: ['9+', '8+', '7+', '6+'],
      },
      {
        key: 'language',
        label: 'Language',
        options: ['English', 'Arabic', 'French', 'Spanish', 'Japanese'],
      },
    ];
  }
}