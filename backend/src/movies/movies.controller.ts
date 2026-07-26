import { Controller, Get, Query, Param, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Public()
  @Get() // Route to get all movies
  async findAll(
    @Query('search') search?: string,
    @Query('genre') genre?: string,
    @Query('year') year?: string,
    @Query('rating') rating?: string,
    @Query('language') language?: string,
    @Query('page') page?: string,
  ) {
    return this.moviesService.findAll({
      search: search,
      genre: genre,
      year: year,
      rating: rating,
      language: language,
      page: page ? Number(page) : 1,
    });
  }

  @Public()
  @Get(':id') // Route to get a specific movie by its ID
  findOne(@Param('id', ParseIntPipe) id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid movie ID');
    }
    return this.moviesService.findOne(id);
  }

  @Public()
  @Get('search') // Route to search for movies based on a query parameter
  async search(@Query('query') query: string) {
    if (!query || query.trim() === '') {
      throw new BadRequestException('Query parameter is required');
    }
    return this.moviesService.findAll({ search: query });
  }
}