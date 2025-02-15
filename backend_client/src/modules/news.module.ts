import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from 'src/controllers/news.controller';
import { News } from 'src/entities/news.entity';
import { NewsService } from 'src/services/news.service';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
