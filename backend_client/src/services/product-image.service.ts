import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from 'src/entities/product-image.entity';

@Injectable()
export class ProductImageService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
  ) {}

  async create(productImageData: Partial<ProductImage>): Promise<ProductImage> {
    const productImage = this.productImageRepository.create(productImageData);
    return this.productImageRepository.save(productImage);
  }

  async findAll(): Promise<ProductImage[]> {
    return this.productImageRepository.find();
  }

  async findById(id: number): Promise<ProductImage> {
    return this.productImageRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    productImageData: Partial<ProductImage>,
  ): Promise<ProductImage> {
    await this.productImageRepository.update(id, productImageData);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.productImageRepository.delete(id);
  }
}
