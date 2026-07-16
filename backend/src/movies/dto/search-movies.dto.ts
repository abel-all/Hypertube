import { IsIn, IsOptional, IsString, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchMoviesDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @Matches(/^\d{4}$/, { message: 'year must be a 4-digit number' })
  year?: string;

  // matches values like "9+", "8+", "7+", "6+"
  @IsOptional()
  @Matches(/^\d\+$/, { message: 'rating must be like "8+"' })
  rating?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  limit?: number = 24;
}