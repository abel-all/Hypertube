import { Controller, Get } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { FilterOptionDto } from './dto/filter-option.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('filters')
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Public()
  @Get()
  getFilters(): FilterOptionDto[] {
    return this.filtersService.getFilters();
  }
}