import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Movie[] {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Movie {
    return this.moviesService.findOne(+id);
  }

  @Post()
  create(@Body() createMovieDto: CreateMovieDto): Movie {
    return this.moviesService.create(createMovieDto);
  }
}