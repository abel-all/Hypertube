export type FilterKey = 'genre' | 'year' | 'rating' | 'language';

export class FilterOptionDto {
  key!: FilterKey;
  label!: string;
  options!: string[];
}