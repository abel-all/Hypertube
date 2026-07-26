// filters.controller.ts
import { Controller, Get } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Public()
  @Get()
  async getFilters() {
    return this.filtersService.getFilters();
  }
}