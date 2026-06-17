import { Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    UseGuards
 } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto, @Req() req) {
    return this.service.create(dto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.service.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.service.findOne(id, req.user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto, @Req() req) {
    return this.service.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.service.remove(id, req.user.id);
  }
}
