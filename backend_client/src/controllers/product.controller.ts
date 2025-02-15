import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(
    @Body() body: { name: string; description: string; price: number },
  ): Promise<Product> {
    try {
      return await this.productService.createProduct(
        body.name,
        body.description,
        body.price,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async getProducts(): Promise<Product[]> {
    try {
      return await this.productService.getProducts();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product> {
    try {
      const product = await this.productService.getProduct(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() body: Partial<Product>,
  ): Promise<Product> {
    try {
      return await this.productService.updateProduct(id, body);
    } catch (error) {
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<{ message: string }> {
    try {
      return await this.productService.deleteProduct(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
