import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<News[]> {
    return this.newsRepository.find();
  }

  async create(title: string, content: string): Promise<News> {
    const newsItem = this.newsRepository.create({ title, content });
    return this.newsRepository.save(newsItem);
  }

  async update(id: number, title: string, content: string): Promise<News> {
    const newsItem = await this.newsRepository.findOne({ where: { id } });
    if (!newsItem) {
      throw new Error('News item not found');
    }
    newsItem.title = title;
    newsItem.content = content;
    return this.newsRepository.save(newsItem);
  }

  async delete(id: number): Promise<void> {
    const newsItem = await this.newsRepository.findOne({ where: { id } });
    if (!newsItem) {
      throw new Error('News item not found');
    }
    await this.newsRepository.remove(newsItem);
  }
}
