import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductImage } from 'src/entities/product-image.entity';
import { ProductImageService } from 'src/services/product-image.service';

@Controller('product-images')
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @Post()
  async create(
    @Body() productImageData: Partial<ProductImage>,
  ): Promise<ProductImage> {
    return this.productImageService.create(productImageData);
  }

  @Get()
  async findAll(): Promise<ProductImage[]> {
    return this.productImageService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProductImage> {
    return this.productImageService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productImageData: Partial<ProductImage>,
  ): Promise<ProductImage> {
    return this.productImageService.update(id, productImageData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productImageService.remove(id);
  }
}
