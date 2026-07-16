import { Controller, Get } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FilterOptionDto } from './dto/filter-option.dto';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Get()
  getFilters(): FilterOptionDto[] {
    return this.filtersService.getFilters();
  }
}