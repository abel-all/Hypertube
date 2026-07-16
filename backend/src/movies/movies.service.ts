import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {

  // Data for testing purposes. In a real application, you would typically fetch this data from a database.  
  private movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      year: 2010,
      rating: 8.8,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn5nQT8_rybq1224lgK77af99UP2MrxCeVm_eBLBYIp1IX_dZaV_-Q6xmjlCvnC8DH3AaOs4o863SruJmbBoiIAYV-4Oz1_l0Xb20vB79pTDcxdCFD1g6WiDwLIwWIdp0-WHnX4LaejZNZd-8ldZDKAw0g2EgV1lG1AI9A8606GVtcj8XySl2EUinTkp95SeHihOaVzRNwT7FjSICBkiYDOEsVGOToNeFNfD4Fb0FN0zZtlLowkBgIiJMZ9Ua3VOx_mYHZdP85EpFx',
      tags: ['Action', 'Sci-Fi'],
    },
    {
      id: 2,
      title: 'The Matrix',
      year: 1999,
      rating: 8.7,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8S01LCrcIgcqKk50rF649ur-7Db6-XIVr0DpVjMqLzcUll8Yi9dU1zbrOtjBvjwl2YGhEoKw38qctpcGaho14csOu5MXbbgW5Iyr5-_pBqcWIYe1ijO8q2RmUH1bvANUzPLUVlnsq7Ee_WkoaPkeqKaK9joT8JV8dPtUvTID2e3WN4ILXPK1arnWCHqtfwplIiuKZ8JVm60AGbWUJfSTxZHEWgaKIp5xhzRd57BbJ1RSPaHKhVKL_EsF5yj4Y4jgk11LzDatQF3y7',
      tags: ['Action', 'Sci-Fi'],
    },
  ];

  findAll(): Movie[] {
    return this.movies;
  }

  // For testing purposes, we are using a simple in-memory array. In a real application, you would typically fetch this data from a database.
  findOne(id: number): Movie {
    const movie = this.movies.find((m) => m.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  create(movieData: CreateMovieDto): Movie {
    const newMovie: Movie = {
      id: this.movies.length + 1,
      title: movieData.title,
      year: movieData.year,
      rating: movieData.rating,
      tags: movieData.tags,
      imageUrl: movieData.imageUrl,
    };
    this.movies.push(newMovie);
    return newMovie;
  }
}