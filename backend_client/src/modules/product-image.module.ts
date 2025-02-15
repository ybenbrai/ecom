import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/entities/product-image.entity';
import { ProductImageService } from 'src/services/product-image.service';
import { ProductImageController } from 'src/controllers/product-image.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImage])],
  providers: [ProductImageService],
  controllers: [ProductImageController],
})
export class ProductImageModule {}
