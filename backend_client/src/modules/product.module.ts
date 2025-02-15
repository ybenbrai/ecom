import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service'; // Assuming ProductService exists
import { ProductController } from 'src/controllers/product.controller'; // Assuming ProductController exists

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // Ensure ProductRepository is registered here
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule], // Export TypeOrmModule to make ProductRepository available in other modules
})
export class ProductModule {}
