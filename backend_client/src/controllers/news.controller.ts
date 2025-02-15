import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NewsService } from 'src/services/news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Post()
  async create(@Body() body: { title: string; content: string }) {
    return this.newsService.create(body.title, body.content);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ) {
    return this.newsService.update(id, body.title, body.content);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.newsService.delete(id);
  }
}
